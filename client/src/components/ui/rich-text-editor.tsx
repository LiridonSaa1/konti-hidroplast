import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bold, Italic, List, Link, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertFormatting = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);
    
    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const formatButtons = [
    {
      icon: Bold,
      label: "Bold",
      action: () => insertFormatting("**", "**"),
    },
    {
      icon: Italic,
      label: "Italic", 
      action: () => insertFormatting("*", "*"),
    },
    {
      icon: List,
      label: "List",
      action: () => insertFormatting("\n• "),
    },
    {
      icon: Link,
      label: "Link",
      action: () => insertFormatting("[", "](url)"),
    },
  ];

  return (
    <div className={className}>
      <div className="border border-input rounded-md">
        {/* Toolbar */}
        <div className="flex items-center gap-1 p-2 border-b border-input bg-muted/50">
          {formatButtons.map((button, index) => (
            <Button
              key={index}
              type="button"
              variant="ghost"
              size="sm"
              onClick={button.action}
              className="h-8 w-8 p-0"
              title={button.label}
            >
              <button.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
        
        {/* Text Area */}
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[200px] border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      
      {/* Help Text */}
      <div className="text-xs text-muted-foreground mt-2">
        <p>Formatting: **bold**, *italic*, • lists, [link](url)</p>
      </div>
    </div>
  );
}