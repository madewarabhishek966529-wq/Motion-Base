"use client";

import React, { useState } from "react";
import { DesignTokenItem, GradientItem } from "@/types";
import { ProvenanceBadge } from "@/components/ui/provenance-badge";
import { TokenEditorModal } from "@/components/design-intelligence/token-editor-modal";
import {
  getContrastRatio,
  checkWcagCompliance,
  exportToCssVariables,
  exportToTailwindConfig,
  exportToW3cFormat,
} from "@/lib/design-tokens";
import { storage } from "@/lib/storage";
import {
  Copy,
  Check,
  Palette,
  Sparkles,
  Layers,
  Plus,
  Download,
  Code,
  FileCode,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DesignDnaSectionProps {
  tokens: DesignTokenItem[];
  gradients: GradientItem[];
  referenceId?: string;
  onTokensUpdated?: (updatedTokens: DesignTokenItem[]) => void;
}

export const DesignDnaSection: React.FC<DesignDnaSectionProps> = ({
  tokens: initialTokens,
  gradients,
  referenceId,
  onTokensUpdated,
}) => {
  const [tokens, setTokens] = useState<DesignTokenItem[]>(initialTokens);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [editingToken, setEditingToken] = useState<DesignTokenItem | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<"css" | "tailwind" | "w3c">("css");

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveToken = (token: DesignTokenItem) => {
    const existingIndex = tokens.findIndex((t) => t.id === token.id);
    let updated: DesignTokenItem[];
    if (existingIndex >= 0) {
      updated = [...tokens];
      updated[existingIndex] = token;
    } else {
      updated = [token, ...tokens];
    }
    setTokens(updated);

    // Save to reference in storage if referenceId is available
    if (referenceId) {
      const allRefs = storage.getReferences();
      const currentRef = allRefs.find((r) => r.id === referenceId);
      if (currentRef) {
        storage.saveReference({ ...currentRef, tokens: updated });
      }
    }

    if (onTokensUpdated) onTokensUpdated(updated);
  };

  const colorTokens = tokens.filter((t) => t.tokenType === "color");
  const typographyTokens = tokens.filter((t) => t.tokenType === "typography");
  const otherTokens = tokens.filter(
    (t) => t.tokenType !== "color" && t.tokenType !== "typography"
  );

  const getExportCode = () => {
    switch (exportFormat) {
      case "css":
        return exportToCssVariables(tokens);
      case "tailwind":
        return exportToTailwindConfig(tokens);
      case "w3c":
        return exportToW3cFormat(tokens);
    }
  };

  return (
    <div className="space-y-8">
      {/* Design DNA Header & Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-brand-surface border border-brand-border">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-brand-coral shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed text-brand-muted">
            <strong className="text-brand-pearl font-semibold block mb-0.5">
              Observed vs. AI Inferred Design Intelligence
            </strong>
            Inspect verified palettes, typography scales, and compute live WCAG 2.1 contrast ratios.
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowExportModal(true)}
            className="gap-1.5 text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Tokens</span>
          </Button>
          <Button
            variant="coral"
            size="sm"
            onClick={() => {
              setEditingToken(null);
              setShowEditorModal(true);
            }}
            className="gap-1.5 text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Token</span>
          </Button>
        </div>
      </div>

      {/* Color Palette with WCAG Indicators */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-pearl flex items-center gap-2">
            <Palette className="w-4 h-4 text-brand-cyan" />
            Color System ({colorTokens.length})
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorTokens.map((token) => {
            const hex = token.tokenValue.hex || "#FFFFFF";
            const contrast = getContrastRatio(hex, "#101522");
            const wcag = checkWcagCompliance(contrast);

            return (
              <div
                key={token.id}
                className="bg-brand-surface border border-brand-border hover:border-brand-muted/40 rounded-xl p-4 flex flex-col justify-between space-y-3 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl border border-white/20 shadow-md shrink-0 cursor-pointer"
                      style={{ backgroundColor: hex }}
                      onClick={() => {
                        setEditingToken(token);
                        setShowEditorModal(true);
                      }}
                      title="Click to edit token"
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

                  <div className="flex items-center gap-1">
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
                </div>

                {/* WCAG Contrast & Value */}
                <div className="flex items-center justify-between pt-2 border-t border-brand-border/50 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-brand-pearl uppercase font-bold">
                      {hex}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-semibold ${
                        wcag.aaLarge
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                      title={`Contrast ratio vs canvas: ${contrast}:1`}
                    >
                      {contrast}:1 {wcag.level}
                    </span>
                  </div>
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
            Extracted Gradients ({gradients.length})
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

      {/* Typography & Scale */}
      {typographyTokens.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-pearl mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-violet" />
            Typography Scale & Kerning
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

      {/* Spacing & Radii */}
      {otherTokens.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-pearl mb-3">
            Layout, Radius & Spacing Tokens
          </h3>
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
        </div>
      )}

      {/* Token Editor Modal */}
      <TokenEditorModal
        isOpen={showEditorModal}
        onClose={() => setShowEditorModal(false)}
        onSave={handleSaveToken}
        initialToken={editingToken}
        applicationId={referenceId || "ref-custom"}
      />

      {/* Export Tokens Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-surface border border-brand-border rounded-2xl max-w-xl w-full p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-brand-border">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-brand-cyan" />
                <h3 className="text-base font-bold text-brand-pearl">
                  Export Design Tokens
                </h3>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-1 rounded-lg text-brand-muted hover:text-brand-pearl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Export format tabs */}
            <div className="flex items-center gap-2 border-b border-brand-border pb-2">
              <button
                onClick={() => setExportFormat("css")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  exportFormat === "css"
                    ? "bg-brand-coral/20 text-brand-coral font-bold"
                    : "text-brand-muted hover:text-brand-pearl"
                }`}
              >
                CSS Variables (:root)
              </button>
              <button
                onClick={() => setExportFormat("tailwind")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  exportFormat === "tailwind"
                    ? "bg-brand-coral/20 text-brand-coral font-bold"
                    : "text-brand-muted hover:text-brand-pearl"
                }`}
              >
                Tailwind Config
              </button>
              <button
                onClick={() => setExportFormat("w3c")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  exportFormat === "w3c"
                    ? "bg-brand-coral/20 text-brand-coral font-bold"
                    : "text-brand-muted hover:text-brand-pearl"
                }`}
              >
                W3C DTCG Format (JSON)
              </button>
            </div>

            <pre className="p-4 bg-brand-bg rounded-xl border border-brand-border text-xs font-mono text-brand-pearl overflow-x-auto max-h-72 leading-relaxed">
              <code>{getExportCode()}</code>
            </pre>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExportModal(false)}
              >
                Close
              </Button>
              <Button
                variant="coral"
                size="sm"
                className="gap-1.5"
                onClick={() => handleCopy("export", getExportCode())}
              >
                {copiedKey === "export" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-brand-bg" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy to Clipboard</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
