import { CheckCircle2, Copy, Eye, Info, RotateCcw, Trash2 } from "lucide-react";

const MASKED_KEY = "•••••••••••••••••••••••••••";

function ActiveBadge() {
  return (
    <span className="inline-flex items-center gap-0.5 rounded-full px-1 py-0.5 text-xs leading-[1.5] text-[#219653] [background:linear-gradient(76.1deg,rgba(177,234,224,0.03)_20.32%,rgba(177,234,224,0.1)_80.16%),linear-gradient(161.38deg,rgba(177,234,224,0.03)_25.2%,rgba(177,234,224,0.1)_74.8%),linear-gradient(180deg,rgba(231,255,245,0.3)_-33.95%,rgba(184,249,226,0.3)_131.48%),#FFFFFF]">
      <CheckCircle2 className="h-4 w-4 shrink-0 fill-[#219653] text-[#219653]" strokeWidth={2} />
      Active
    </span>
  );
}

export function ApiKeyManagementPanel() {
  return (
    <div className="box-border flex w-full flex-col gap-4 rounded-xl border border-[#E9E2F4] bg-white py-5 font-sans">
      <div className="px-5">
        <h3 className="text-base font-semibold leading-6 text-[#616161]">API Key Management</h3>
      </div>

      <div className="px-5">
        <div className="flex w-full flex-col gap-3 rounded-xl bg-[#F8F9FA] p-5">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-base font-semibold leading-6 text-[#212121]">
                Production Trading Bot
              </span>
              <ActiveBadge />
            </div>
            <p className="text-sm font-normal leading-[1.5] text-[#616161]">Created: 4th Sep 2025</p>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-5">
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="flex h-12 items-center gap-2 rounded-lg border-[1.4px] border-[#F5F5F5] bg-white px-2.5">
                <span className="min-w-0 flex-1 truncate text-sm font-medium leading-[1.5] tracking-[0.12em] text-[#212121]">
                  {MASKED_KEY}
                </span>
                <div className="flex shrink-0 items-center gap-6">
                  <button
                    type="button"
                    className="text-[#616161] transition-opacity hover:opacity-70"
                    aria-label="Show API key"
                  >
                    <Eye className="h-5 w-5" strokeWidth={1.75} />
                  </button>
                  <button
                    type="button"
                    className="text-[#616161] transition-opacity hover:opacity-70"
                    aria-label="Copy API key"
                  >
                    <Copy className="h-5 w-5" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Info className="h-[18px] w-[18px] shrink-0 text-[#9E9E9E]" strokeWidth={1.75} />
                <span className="text-sm font-normal leading-[1.5] text-[#9E9E9E]">
                  API Key will expire on: 4th Sep 2026
                </span>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-5">
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[#E9E2F4] bg-white px-3 py-2 text-sm font-semibold leading-[1.5] transition-opacity hover:opacity-90"
              >
                <RotateCcw className="h-5 w-5 shrink-0 text-[#6424C5]" strokeWidth={1.75} />
                <span className="api-key-grad-text">Rotate Key</span>
              </button>
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#E8584B] px-3 py-2 text-sm font-semibold leading-[1.5] text-white transition-opacity hover:opacity-90"
              >
                <Trash2 className="h-5 w-5 shrink-0" strokeWidth={1.75} />
                Revoke Key
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5">
        <p className="rounded-lg bg-[rgba(255,244,233,0.5)] px-3 py-2.5 text-sm font-normal leading-[1.5] text-[#616161]">
          Note: If your secret key is lost, you can rotate your API keys. This will generate a new
          Secret key for your application.
        </p>
      </div>
    </div>
  );
}
