import json
import re
import os
import urllib.request
import urllib.parse

# List of target locales
TARGET_LOCALES = {
    'es': 'Spanish',
    'fr': 'French',
    'hi': 'Hindi',
    'ja': 'Japanese',
    'ko': 'Korean',
    'ru': 'Russian',
    'vi': 'Vietnamese',
    'zh': 'Chinese (Simplified)'
}

# Regex patterns to preserve placeholders
PLACEHOLDER_PATTERN = re.compile(r'(\{[^}]+\}|<[^>]+>|https?://[^\s]+|\*\*[^*]+\*\*)')

def translate_text(text, target_lang):
    if not text or not isinstance(text, str):
        return text

    # Extract and replace placeholders with tokens like __PH_0__
    placeholders = []
    def replace_ph(match):
        placeholders.append(match.group(0))
        return f"__PH_{len(placeholders)-1}__"

    protected_text = PLACEHOLDER_PATTERN.sub(replace_ph, text)

    # Use Google Translate free API endpoint
    url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl={target_lang}&dt=t&q={urllib.parse.quote(protected_text)}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            translated_parts = [part[0] for part in result[0] if part[0]]
            translated_text = "".join(translated_parts)

        # Restore original placeholders
        for i, ph in enumerate(placeholders):
            translated_text = re.sub(rf'__PH_{i}__\s*|__ PH _{i} __\s*', ph, translated_text)

        return translated_text
    except Exception as e:
        print(f"Error translating text '{text[:20]}...': {e}")
        return text

def translate_json_obj(obj, target_lang):
    if isinstance(obj, dict):
        return {k: translate_json_obj(v, target_lang) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [translate_json_obj(item, target_lang) for item in obj]
    elif isinstance(obj, str):
        return translate_text(obj, target_lang)
    else:
        return obj

def main():
    if not os.path.exists('en.json'):
        print("en.json not found in current directory.")
        return

    with open('en.json', 'r', encoding='utf-8') as f:
        en_data = json.load(f)

    for lang_code, lang_name in TARGET_LOCALES.items():
        print(f"Translating to {lang_name} ({lang_code}.json)...")
        translated_data = translate_json_obj(en_data, lang_code)
        
        output_filename = f"{lang_code}.json"
        with open(output_filename, 'w', encoding='utf-8') as f:
            json.dump(translated_data, f, ensure_ascii=False, indent=2)
        print(f"Saved {output_filename}")

if __name__ == '__main__':
    main()