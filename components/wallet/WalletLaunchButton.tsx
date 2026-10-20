"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { AlertTriangle, Check, Copy, ExternalLink, Loader2, Wallet, X } from "lucide-react";
import {
  WALLET_LAUNCH_TIMEOUT_MS,
  WALLET_OPTIONS,
  WALLET_ORDER,
  getWalletDeepLink,
  isAllowedDappUrl,
  type WalletId,
} from "@/config/constants";

const LAST_WALLET_KEY = "carypact:last-wallet";

interface InjectedProvider {
  isMetaMask?: boolean;
  isTrust?: boolean;
  isTrustWallet?: boolean;
  isTokenPocket?: boolean;
  providers?: InjectedProvider[];
}

type Stage = "select" | "launching" | "fallback";

function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const iPadOs = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || iPadOs;
}

/** True when the page already runs inside a wallet's DApp browser (or a wallet extension is injected). */
function hasInjectedWallet(): boolean {
  if (typeof window === "undefined") return false;
  const eth = (window as unknown as { ethereum?: InjectedProvider }).ethereum;
  if (!eth) return false;
  const list = eth.providers?.length ? eth.providers : [eth];
  return list.some((p) => p.isMetaMask || p.isTrust || p.isTrustWallet || p.isTokenPocket);
}

function readLastWallet(): WalletId | null {
  try {
    const v = window.localStorage.getItem(LAST_WALLET_KEY);
    return v && (WALLET_ORDER as readonly string[]).includes(v) ? (v as WalletId) : null;
  } catch {
    return null;
  }
}

interface WalletLaunchButtonProps {
  /** Normal CaryPact DApp URL (must be on an allow-listed host, see DAPP_ALLOWED_HOSTS). */
  url: string;
  id?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Renders a normal link (works without JS, on desktop, and inside wallet browsers).
 * On a mobile browser with no injected wallet, the click opens a wallet selector that
 * launches the chosen wallet's DApp browser, with a fallback if the wallet does not open.
 */
export default function WalletLaunchButton({ url, id, className, children }: WalletLaunchButtonProps) {
  const t = useTranslations("wallet");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const copyTimerRef = useRef<number | null>(null);

  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("select");
  const [selected, setSelected] = useState<WalletId | null>(null);
  const [lastWallet, setLastWallet] = useState<WalletId | null>(null);
  const [copied, setCopied] = useState(false);

  const allowed = isAllowedDappUrl(url);

  const stopWatching = useCallback(() => {
    cleanupRef.current?.();
    cleanupRef.current = null;
  }, []);

  // Sync <dialog> with state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(
    () => () => {
      stopWatching();
      if (copyTimerRef.current !== null) window.clearTimeout(copyTimerRef.current);
    },
    [stopWatching]
  );

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (!allowed) return;
    // Desktop, or already inside a wallet browser: behave as a normal link.
    if (!isMobileDevice() || hasInjectedWallet()) return;
    e.preventDefault();
    setLastWallet(readLastWallet());
    setStage("select");
    setCopied(false);
    setOpen(true);
  };

  const closeDialog = () => {
    stopWatching();
    setOpen(false);
  };

  const watchLaunch = () => {
    stopWatching();
    let left = false;
    const finish = () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      cleanupRef.current = null;
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        // The OS switched away from the browser, so the wallet most likely opened.
        left = true;
        window.clearTimeout(timer);
      } else if (left) {
        // User came back to the browser.
        finish();
        setStage("select");
      }
    };
    const onPageHide = () => {
      left = true;
      window.clearTimeout(timer);
    };
    const timer = window.setTimeout(() => {
      finish();
      setStage("fallback");
    }, WALLET_LAUNCH_TIMEOUT_MS);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);
    cleanupRef.current = finish;
  };

  const launch = (wallet: WalletId) => {
    setSelected(wallet);
    try {
      window.localStorage.setItem(LAST_WALLET_KEY, wallet);
    } catch {
      /* storage unavailable: ignore */
    }
    let link: string;
    try {
      link = getWalletDeepLink(wallet, url);
    } catch {
      setStage("fallback");
      return;
    }
    setStage("launching");
    watchLaunch();
    window.location.href = link;
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (copyTimerRef.current !== null) window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable: user can still select the visible link text */
    }
  };

  const wallets: WalletId[] = lastWallet
    ? [lastWallet, ...WALLET_ORDER.filter((w) => w !== lastWallet)]
    : [...WALLET_ORDER];
  const selectedName = selected ? WALLET_OPTIONS[selected].name : "";

  return (
    <>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        id={id}
        className={className}
        onClick={handleClick}
      >
        {children}
      </a>

      <dialog
        ref={dialogRef}
        aria-labelledby={`${id ?? "wallet"}-title`}
        onClose={() => {
          stopWatching();
          setOpen(false);
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) closeDialog();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-[#1E2540] bg-[#0F1428] p-0 text-[#C4CBD8] shadow-2xl backdrop:bg-black/70"
      >
        <div className="p-5 sm:p-6 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 id={`${id ?? "wallet"}-title`} className="text-lg font-bold text-white">
                {t("title")}
              </h2>
              <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">{t("subtitle")}</p>
            </div>
            <button
              type="button"
              onClick={closeDialog}
              aria-label={t("close")}
              className="shrink-0 p-1.5 rounded-lg text-[#8EA2C6] hover:text-white hover:bg-[#1A2040] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {stage !== "fallback" && (
            <div className="space-y-2.5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#8EA2C6]">{t("chooseWallet")}</div>
              {wallets.map((w) => {
                const opt = WALLET_OPTIONS[w];
                const busy = stage === "launching";
                return (
                  <button
                    key={w}
                    type="button"
                    disabled={busy}
                    onClick={() => launch(w)}
                    className="w-full min-h-12 flex items-center gap-3 px-3.5 py-3 rounded-xl bg-[#101428] border border-[#1E2746] hover:bg-[#161C36] hover:border-[#2A3560] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-left"
                  >
                    <span
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${opt.brandColor}26`, color: opt.brandColor }}
                    >
                      {busy && selected === w ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Wallet className="w-4 h-4" />
                      )}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-semibold text-white truncate">
                        {busy && selected === w ? t("launching", { wallet: opt.name }) : t("openIn", { wallet: opt.name })}
                      </span>
                      {w === lastWallet && !busy && (
                        <span className="block text-[10px] font-mono uppercase text-[#22D3FF]">{t("lastUsed")}</span>
                      )}
                    </span>
                  </button>
                );
              })}
              {stage === "launching" ? (
                <p role="status" className="text-[11px] text-[#8EA2C6]">
                  {t("launchingHint")}
                </p>
              ) : (
                <p className="text-[11px] text-[#8EA2C6] leading-relaxed">{t("install")}</p>
              )}
            </div>
          )}

          {stage === "fallback" && (
            <div role="alert" className="space-y-4">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#1A140C] border border-[#3D3316] text-amber-300">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-bold">{t("fallbackTitle", { wallet: selectedName })}</div>
                  <p className="text-xs text-[#CBD5E1] mt-1 leading-relaxed">{t("fallbackDesc")}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-h-11 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#22D3FF] to-[#0EA5E9] text-[#070913] text-xs font-bold uppercase tracking-wider"
                >
                  <span>{t("openNormal")}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={copyLink}
                  className="flex-1 min-h-11 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#161C36] border border-[#2A3560] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1B2342] transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? t("copied") : t("copyLink")}</span>
                </button>
              </div>

              <div className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#8EA2C6]">{t("stepsTitle")}</div>
                <ol className="list-decimal pl-5 space-y-1.5 text-xs text-[#CBD5E1] leading-relaxed">
                  <li>{t("step1")}</li>
                  <li>{t("step2")}</li>
                  <li>{t("step3")}</li>
                </ol>
                <div className="rounded-lg bg-[#0C1022] border border-[#1A223D] px-3 py-2 text-[11px] font-mono text-[#8EA2C6] break-all select-all">
                  {url}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStage("select")}
                className="text-xs font-semibold text-[#22D3FF] hover:underline"
              >
                {t("tryAnother")}
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}