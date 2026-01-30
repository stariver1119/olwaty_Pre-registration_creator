// Added React import to resolve the 'React' namespace error for React.ReactNode
import React from 'react';

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface PainPoint {
  id: string;
  scenario: string;
  content: string;
}