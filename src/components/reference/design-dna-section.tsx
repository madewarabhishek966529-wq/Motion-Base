"use client";

import React, { useState } from "react";
import { DesignTokenItem, GradientItem } from "@/types";
import { ProvenanceBadge } from "@/components/ui/provenance-badge";
import { Copy, Check, Palette, Sparkles, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface DesignDnaSectionProps {
  tokens: DesignTokenItem[];
  gradients: GradientItem[];
}

export const DesignDnaSection: React.FC<DesignDnaSectionProps> = ({
  tokens,
  gradients,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const colorTokens = tokens.filter((t) => t.tokenType === "color");
  const typographyTokens = tokens.filter((t) => t.tokenType === "typography");
  const otherTokens = tokens.filter(
    (t) => t.tokenType !== "color" && t.tokenType !== "typography"
  );

  return (
    <div className="space-y-8">
      {/* Design DNA Transparency Callout */}
      <div className="p-4 rounded-2xl bg-brand-surface border border-brand-border/80 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-brand-coral shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed text-brand-muted">
          <strong className="text-brand-pearl font-semibold block mb-0.5">
            Observed vs. AI Inferred Design Properties
          </strong>
          Motionbase distinguishes directly extracted hex colors and border radii from typography and easing estimates. Each token carries its provenance, confidence rating, and evidence note.
        </div>
      </div>

      {/* Color Palette */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-pearl mb-4 flex items-center gap-2">
          <Palette className="w-4 h-4 text-brand-cyan" />
          Color System
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorTokens.map((token) => {
            const hex = token.tokenValue.hex || "#FFFFFF";
            return (
              <div
                key={token.id}
                className="bg-brand-surface border border-brand-border rounded-xl p-4 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl border border-white/20 shadow-md shrink-0"
                      style={{ backgroundColor: hex }}
                    />
                    <div>
                      <h4 className="text-xs font-semibold text-brand-pearl font-mono">
                        {token.tokenName}
                      </h4>
                      <p className="text-[11px] text-brand-muted">
                        {token.tokenValue.role || "Color swatch"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(token.id, hex)}
                    className="p-1.5 rounded-lg bg-brand-elevated hover:bg-brand-border text-brand-muted hover:text-brand-pearl transition-colors"
                    title="Copy HEX to clipboard"
                  >
                    {copiedKey === token.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-brand-border/50 text-[11px]">
                  <span className="font-mono text-brand-pearl uppercase">{hex}</span>
                  <ProvenanceBadge
                    provenance={token.provenance}
                    confidence={token.confidence}
                  />
                </div>
                {token.evidenceNote && (
                  <p className="text-[10px] text-brand-muted/70 italic">
                    Note: {token.evidenceNote}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Gradients */}
      {gradients.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-pearl mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-coral" />
            Extracted Gradients
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {gradients.map((grad) => (
              <div
                key={grad.id}
                className="bg-brand-surface border border-brand-border rounded-xl p-4 space-y-3"
              >
                <div
                  className="h-20 w-full rounded-xl border border-white/10 shadow-inner"
                  style={{ background: grad.css }}
                />
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-brand-pearl">
                      {grad.name}
                    </h4>
                    <span className="text-[10px] font-mono text-brand-muted">
                      Angle: {grad.angle || "Linear"}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(grad.id, grad.css)}
                    className="px-2.5 py-1 text-xs font-medium bg-brand-elevated hover:bg-brand-border text-brand-pearl rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    {copiedKey === grad.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied CSS</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy CSS</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Typography & Layout Tokens */}
      {typographyTokens.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-pearl mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-violet" />
            Typography & Scale
          </h3>
          <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden divide-y divide-brand-border/60">
            {typographyTokens.map((typ) => (
              <div
                key={typ.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <h4 className="font-semibold text-brand-pearl">{typ.tokenName}</h4>
                  <p className="text-brand-muted mt-0.5">
                    Family: {typ.tokenValue.family} • Size: {typ.tokenValue.size} • Weight: {typ.tokenValue.weight}
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <ProvenanceBadge
                    provenance={typ.provenance}
                    confidence={typ.confidence}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Spacing / Radii */}
      {otherTokens.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {otherTokens.map((t) => (
            <div
              key={t.id}
              className="p-3 bg-brand-surface border border-brand-border rounded-xl text-center"
            >
              <div className="text-[11px] text-brand-muted uppercase tracking-wider mb-1">
                {t.tokenName}
              </div>
              <div className="text-sm font-mono font-bold text-brand-pearl">
                {t.tokenValue.value || JSON.stringify(t.tokenValue)}
              </div>
              <div className="mt-2 flex justify-center">
                <ProvenanceBadge
                  provenance={t.provenance}
                  showIcon={false}
                  className="text-[9px] py-0 px-1"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
