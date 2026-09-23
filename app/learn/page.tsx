import BotChainArchitecture from '@/components/BotChainArchitecture'
import LearnSection from '@/components/LearnSection'
import VipSystemExplainer from '@/components/VipSystemExplainer'
import React from 'react'

export default function page() {
  return (
    <div>
                <LearnSection />
                
        {/* BOT Chain Architecture Section (5 Pillars) */}
        <BotChainArchitecture />
         {/* 10-Tier VIP System Explainer */}
        <VipSystemExplainer />


    </div>
  )
}
