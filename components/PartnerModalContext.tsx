"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

export type PlanType = "starter" | "business" | "custom" | "undecided";
export type IndustryType = "fashion" | "food" | "beauty" | "living" | "b2b" | "other";

export interface ModalContextOptions {
  plan?: PlanType;
  industry?: IndustryType;
}

interface PartnerModalContextValue {
  isOpen: boolean;
  plan: PlanType;
  industry: IndustryType;
  openPartnerModal: (context?: ModalContextOptions) => void;
  closePartnerModal: () => void;
}

const PartnerModalContext = createContext<PartnerModalContextValue | undefined>(undefined);

export function PartnerModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [plan, setPlan] = useState<PlanType>("business");
  const [industry, setIndustry] = useState<IndustryType>("food");

  const openPartnerModal = useCallback((context?: ModalContextOptions) => {
    if (context?.plan) {
      setPlan(context.plan);
    } else {
      setPlan("business");
    }

    if (context?.industry) {
      setIndustry(context.industry);
    } else {
      setIndustry("food");
    }

    setIsOpen(true);
  }, []);

  const closePartnerModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      plan,
      industry,
      openPartnerModal,
      closePartnerModal,
    }),
    [isOpen, plan, industry, openPartnerModal, closePartnerModal]
  );

  return (
    <PartnerModalContext.Provider value={value}>
      {children}
    </PartnerModalContext.Provider>
  );
}

export function usePartnerModal() {
  const context = useContext(PartnerModalContext);
  if (!context) {
    throw new Error("usePartnerModal must be used within a PartnerModalProvider");
  }
  return context;
}
