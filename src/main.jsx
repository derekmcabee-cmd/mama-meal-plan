import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MamaMealPlan from './MamaMealPlan';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MamaMealPlan />
  </StrictMode>
);
