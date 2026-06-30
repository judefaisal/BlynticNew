import React, { useEffect } from 'react';

const VoiceflowWidget: React.FC = () => {
  useEffect(() => {
    let checkShadowRoot: any = null;

    // Load the script only once
    if (!document.getElementById('voiceflow-script')) {
      const script = document.createElement('script');
      script.id = 'voiceflow-script';
      script.type = 'text/javascript';
      script.onload = () => {
        if ((window as any).voiceflow?.chat) {
          (window as any).voiceflow.chat.load({
            verify: { projectID: '6a430c5039c65a537385f4bd' },
            url: 'https://general-runtime.voiceflow.com',
            voice: {
              url: "https://runtime-api.voiceflow.com"
            }
          });
        }
      };
      script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      document.body.appendChild(script);
    } else {
      // If already loaded, just show it
      if ((window as any).voiceflow?.chat) {
        try {
          (window as any).voiceflow.chat.show();
        } catch (e) {
          console.error(e);
        }
      }
    }

    // Persistently check for the Voiceflow Shadow DOM and inject the 1.25x scaling style
    checkShadowRoot = setInterval(() => {
      const vfc = document.querySelector('voiceflow-chat');
      if (vfc && vfc.shadowRoot) {
        if (!vfc.shadowRoot.getElementById('voiceflow-custom-launcher-style')) {
          const style = document.createElement('style');
          style.id = 'voiceflow-custom-launcher-style';
          style.innerHTML = `
            .vfrc-launcher, [class*="launcher"] {
              transform: scale(1.25) !important;
              transform-origin: bottom right !important;
              transition: transform 0.2s ease-in-out !important;
            }
            .vfrc-launcher:hover, [class*="launcher"]:hover {
              transform: scale(1.35) !important;
            }
          `;
          vfc.shadowRoot.appendChild(style);
        }
      }
    }, 1000);

    return () => {
      if (checkShadowRoot) {
        clearInterval(checkShadowRoot);
      }
      // Hide when component unmounts
      if ((window as any).voiceflow?.chat) {
        try {
          (window as any).voiceflow.chat.hide();
        } catch (e) {
          console.error(e);
        }
      }
    };
  }, []);

  return null;
};

export default VoiceflowWidget;
