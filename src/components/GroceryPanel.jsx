import { useState } from 'react';
import { CheckIcon, CopyIcon, ShareIcon } from './Icons';
import { buildGroceryList, groceryToText } from '../utils/groceryList';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function GroceryPanel({ meals, week, onClose }) {
  const [checked, setChecked] = useLocalStorage(`grocery-checked-${week}`, {});
  const [copied, setCopied] = useState(false);
  const groceryList = buildGroceryList(meals);
  const allItems = Object.values(groceryList).flat();
  const checkedCount = Object.values(checked).filter(Boolean).length;

  const toggle = (key) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));

  const handleCopy = () => {
    const text = groceryToText(groceryList, week);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = () => {
    const text = groceryToText(groceryList, week);
    if (navigator.share) {
      navigator.share({ title: `Week ${week} Grocery List`, text }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <div style={{ background: "#FFFDF9", borderRadius: 16, marginBottom: 16, border: "1px solid rgba(139,109,82,0.1)", overflow: "hidden", animation: "fadeIn 0.3s ease" }}>
      <div style={{ padding: "16px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#2C1810", margin: 0, fontFamily: "'Fraunces',serif" }}>Grocery List</h3>
          <p style={{ fontSize: 11, color: "#8B6D52", margin: "2px 0 0", fontFamily: "'DM Sans',sans-serif" }}>
            {allItems.length} items across 4 meals · {checkedCount} checked
          </p>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#8B6D52", fontSize: 18, padding: 4 }}>×</button>
      </div>

      <div style={{ padding: "0 20px 12px", display: "flex", gap: 8 }}>
        <button onClick={handleCopy} style={{
          display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10,
          border: "1px solid rgba(139,109,82,0.15)", background: copied ? "rgba(133,163,146,0.12)" : "transparent",
          cursor: "pointer", fontSize: 12, fontWeight: 600, color: copied ? "#85A392" : "#8B6D52",
          fontFamily: "'DM Sans',sans-serif", transition: "all 0.3s",
        }}>
          {copied ? <><CheckIcon /> Copied!</> : <><CopyIcon /> Copy list</>}
        </button>
        <button onClick={handleShare} style={{
          display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10,
          border: "1px solid rgba(139,109,82,0.15)", background: "transparent",
          cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#8B6D52",
          fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s",
        }}>
          <ShareIcon /> Share
        </button>
      </div>

      {checkedCount > 0 && (
        <div style={{ padding: "0 20px 12px" }}>
          <div style={{ background: "rgba(139,109,82,0.08)", borderRadius: 4, height: 4, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 4, transition: "width 0.4s ease",
              width: `${(checkedCount / allItems.length) * 100}%`, background: "#85A392",
            }} />
          </div>
        </div>
      )}

      <div style={{ padding: "0 20px 20px" }}>
        {Object.entries(groceryList).map(([category, items]) => (
          <div key={category} style={{ marginBottom: 12 }}>
            <p style={{
              fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
              color: "#8B6D52", margin: "0 0 8px", fontFamily: "'DM Sans',sans-serif", opacity: 0.6,
            }}>
              {category}
            </p>
            {items.map((item, i) => {
              const key = `${category}-${i}`;
              const done = checked[key];
              return (
                <div key={key} onClick={() => toggle(key)} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "8px 0", cursor: "pointer",
                  borderBottom: i < items.length - 1 ? "1px solid rgba(139,109,82,0.06)" : "none",
                  opacity: done ? 0.4 : 1, transition: "opacity 0.2s",
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                    border: done ? "none" : "1.5px solid rgba(139,109,82,0.25)",
                    background: done ? "#85A392" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s", color: "white",
                  }}>
                    {done && <CheckIcon />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{
                      fontSize: 13, color: "#5C4033", fontFamily: "'DM Sans',sans-serif",
                      textDecoration: done ? "line-through" : "none",
                    }}>
                      {item.text}
                    </span>
                  </div>
                  <span style={{
                    fontSize: 10, color: "#8B6D52", opacity: 0.4, fontFamily: "'DM Sans',sans-serif",
                    flexShrink: 0,
                  }}>
                    {item.from}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
