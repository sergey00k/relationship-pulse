import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';

interface StripeContextProps {
  stripe: Stripe | null;
  elements: StripeElements | null;
}

const StripeContext = createContext<StripeContextProps | null>(null);

export const useStripe = () => {
  const context = useContext(StripeContext);
  if (!context) {
    throw new Error('useStripe must be used within a StripeProvider');
  }
  return context;
};

interface StripeProviderProps {
  publishableKey: string;
  children: ReactNode;
}

export const StripeProvider: React.FC<StripeProviderProps> = ({ publishableKey, children }) => {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [elements, setElements] = useState<StripeElements | null>(null);

  useEffect(() => {
    loadStripe(publishableKey).then((stripeInstance) => {
      setStripe(stripeInstance);
      setElements(stripeInstance?.elements());
    });
  }, [publishableKey]);

  return <StripeContext.Provider value={{ stripe, elements }}>{children}</StripeContext.Provider>;
};
