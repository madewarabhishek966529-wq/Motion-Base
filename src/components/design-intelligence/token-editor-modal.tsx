"use client";

import React, { useState } from "react";
import { DesignTokenItem, ProvenanceType, ConfidenceLevel } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getContrastRatio, checkWcagCompliance } from "@/lib/design-tokens";
import { Sparkles, Shield, X } from "lucide-react";

interface TokenEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (token: DesignTokenItem) => void;
  initialToken?: DesignTokenItem | null;
  applicationId: string;
}

export const TokenEditorModal: React.FC<TokenEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialToken,
  applicationId,
}) => {
  const [tokenName, setTokenName] = useState(initialToken?.tokenName || "");
  const [tokenType, setTokenType] = useState<DesignTokenItem["tokenType"]>(
    initialToken?.tokenType || "color"
  );
  const [hexColor, setHexColor] = useState(initialToken?.tokenValue?.hex || "#7867FF");
  const [role, setRole] = useState(initialToken?.tokenValue?.role || "Brand Accent");
  const [otherValue, setOtherValue] = useState(
    initialToken?.tokenValue?.value || initialToken?.tokenValue?.size || "16px"
  );
  const [provenance, setProvenance] = useState<ProvenanceType>(
    initialToken?.provenance || "manually_verified"
  );
  const [confidence, setConfidence] = useState<ConfidenceLevel>(
    initialToken?.confidence || "high"
  );
  const [evidenceNote, setEvidenceNote] = useState(initialToken?.evidenceNote || "");

  if (!isOpen) return null;

  // Real-time contrast against dark canvas (#101522) and light text (#F4F1FF)
  const contrastAgainstDark = getContrastRatio(hexColor, "#101522");
  const wcagDark = checkWcagCompliance(contrastAgainstDark);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenName.trim()) return;

    const tokenValue: Record<string, any> =
      tokenType === "color"
        ? { hex: hexColor, role }
        : { value: otherValue };

    const token: DesignTokenItem = {
      id: initialToken?.id || `tok-${Date.now()}`,
      applicationId,
      tokenType,
      tokenName: tokenName.trim().toLowerCase().replace(/\s+/g, "-"),
      tokenValue,
      provenance,
      confidence,
      evidenceNote: evidenceNote.trim() || undefined,
      updatedAt: new Date().toISOString(),
    };

    onSave(token);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-brand-surface border border-brand-border rounded-2xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-brand-border">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-coral" />
            <h3 className="text-base font-bold text-brand-pearl">
              {initialToken ? "Edit Design Token" : "Add Design Token"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-brand-muted hover:text-brand-pearl"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-brand-muted block mb-1 font-medium">
                Token Name *
              </label>
              <Input
                required
                placeholder="e.g. brand-primary"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-brand-muted block mb-1 font-medium">
                Token Type
              </label>
              <select
                value={tokenType}
                onChange={(e) => setTokenType(e.target.value as any)}
                className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-xs text-brand-pearl"
              >
                <option value="color">Color</option>
                <option value="typography">Typography</option>
                <option value="spacing">Spacing</option>
                <option value="radius">Border Radius</option>
                <option value="shadow">Shadow</option>
              </select>
            </div>
          </div>

          {tokenType === "color" ? (
            <div className="space-y-3 p-3 bg-brand-elevated/50 rounded-xl border border-brand-border">
              <div className="flex items-center gap-3">
                <Input
                  type="color"
                  value={hexColor}
                  onChange={(e) => setHexColor(e.target.value)}
                  className="w-14 h-10 cursor-pointer p-1"
                />
                <Input
                  value={hexColor}
                  onChange={(e) => setHexColor(e.target.value)}
                  placeholder="#7867FF"
                  className="font-mono uppercase"
                />
                <Input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Active Button Fill"
                />
              </div>

              {/* Live WCAG Preview */}
              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-brand-muted">
                  Contrast vs Dark Canvas: <strong>{contrastAgainstDark}:1</strong>
                </span>
                <span
                  className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                    wcagDark.aaLarge
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                      : "bg-red-500/10 text-red-400 border border-red-500/30"
                  }`}
                >
                  WCAG {wcagDark.level}
                </span>
              </div>
            </div>
          ) : (
            <div>
              <label className="text-brand-muted block mb-1 font-medium">
                Token Value
              </label>
              <Input
                required
                placeholder="e.g. 12px or 1.5rem"
                value={otherValue}
                onChange={(e) => setOtherValue(e.target.value)}
              />
            </div>
          )}

          {/* Provenance & Confidence */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-brand-muted block mb-1 font-medium">
                Provenance Origin
              </label>
              <select
                value={provenance}
                onChange={(e) => setProvenance(e.target.value as any)}
                className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-xs text-brand-pearl"
              >
                <option value="observed">Observed in UI</option>
                <option value="extracted">Extracted Deterministically</option>
                <option value="manually_verified">Manually Verified</option>
                <option value="inferred">AI Inferred</option>
                <option value="user_submitted">User Submitted</option>
              </select>
            </div>

            <div>
              <label className="text-brand-muted block mb-1 font-medium">
                Confidence Rating
              </label>
              <select
                value={confidence}
                onChange={(e) => setConfidence(e.target.value as any)}
                className="w-full bg-brand-bg border border-brand-border rounded-xl p-2.5 text-xs text-brand-pearl"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-brand-muted block mb-1 font-medium">
              Evidence Note (Optional)
            </label>
            <textarea
              className="w-full bg-brand-bg border border-brand-border rounded-xl p-3 text-xs text-brand-pearl placeholder:text-brand-muted/60 focus:border-brand-coral focus:outline-none h-16"
              placeholder="e.g. Sampled directly from active button state in header screenshot"
              value={evidenceNote}
              onChange={(e) => setEvidenceNote(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-brand-border">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="coral" size="sm">
              Save Token
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
