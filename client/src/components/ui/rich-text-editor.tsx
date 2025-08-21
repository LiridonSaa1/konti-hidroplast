import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Bold, 
  Italic, 
  Underline,
  Strikethrough,
  List, 
  ListOrdered,
  Link, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  Minus
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [fontSize, setFontSize] = useState("14");

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

  const insertLineFormatting = (prefix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    // If there's no selection, find the current line
    if (start === end) {
      const beforeCursor = value.substring(0, start);
      const afterCursor = value.substring(start);
      const lineStart = beforeCursor.lastIndexOf('\n') + 1;
      const lineEnd = afterCursor.indexOf('\n');
      const lineEndPos = lineEnd === -1 ? value.length : start + lineEnd;
      
      const currentLine = value.substring(lineStart, lineEndPos);
      const newLine = prefix + currentLine;
      const newText = value.substring(0, lineStart) + newLine + value.substring(lineEndPos);
      onChange(newText);
    } else {
      const lines = selectedText.split('\n');
      const formattedLines = lines.map(line => prefix + line);
      const newText = value.substring(0, start) + formattedLines.join('\n') + value.substring(end);
      onChange(newText);
    }
  };

  const formatButtons = [
    {
      icon: Bold,
      label: "Bold",
      action: () => insertFormatting("<strong>", "</strong>"),
    },
    {
      icon: Italic,
      label: "Italic", 
      action: () => insertFormatting("<em>", "</em>"),
    },
    {
      icon: Underline,
      label: "Underline", 
      action: () => insertFormatting("<u>", "</u>"),
    },
    {
      icon: Strikethrough,
      label: "Strikethrough", 
      action: () => insertFormatting("<s>", "</s>"),
    },
    {
      icon: List,
      label: "Bullet List",
      action: () => insertLineFormatting("• "),
    },
    {
      icon: ListOrdered,
      label: "Numbered List",
      action: () => insertLineFormatting("1. "),
    },
    {
      icon: Link,
      label: "Link",
      action: () => insertFormatting('<a href="https://example.com">', "</a>"),
    },
    {
      icon: Quote,
      label: "Blockquote",
      action: () => insertLineFormatting("> "),
    },
    {
      icon: Code,
      label: "Code",
      action: () => insertFormatting("<code>", "</code>"),
    },
    {
      icon: Minus,
      label: "Horizontal Rule",
      action: () => insertFormatting("\n<hr>\n"),
    },
  ];

  const headingButtons = [
    {
      icon: Heading1,
      label: "Heading 1",
      action: () => insertFormatting("<h1>", "</h1>"),
    },
    {
      icon: Heading2,
      label: "Heading 2",
      action: () => insertFormatting("<h2>", "</h2>"),
    },
    {
      icon: Heading3,
      label: "Heading 3",
      action: () => insertFormatting("<h3>", "</h3>"),
    },
  ];

  const alignmentButtons = [
    {
      icon: AlignLeft,
      label: "Align Left",
      action: () => insertFormatting('<div style="text-align: left;">', "</div>"),
    },
    {
      icon: AlignCenter,
      label: "Align Center",
      action: () => insertFormatting('<div style="text-align: center;">', "</div>"),
    },
    {
      icon: AlignRight,
      label: "Align Right",
      action: () => insertFormatting('<div style="text-align: right;">', "</div>"),
    },
  ];

  return (
    <div className={className}>
      <div className="border border-input rounded-md">
        {/* Enhanced Toolbar */}
        <div className="p-2 border-b border-input bg-muted/50">
          {/* First Row - Font Size and Headings */}
          <div className="flex items-center gap-2 mb-2">
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger className="w-20 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12px</SelectItem>
                <SelectItem value="14">14px</SelectItem>
                <SelectItem value="16">16px</SelectItem>
                <SelectItem value="18">18px</SelectItem>
                <SelectItem value="20">20px</SelectItem>
                <SelectItem value="24">24px</SelectItem>
              </SelectContent>
            </Select>
            
            <Separator orientation="vertical" className="h-6" />
            
            {headingButtons.map((button, index) => (
              <Button
                key={`heading-${index}`}
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
          
          {/* Second Row - Text Formatting */}
          <div className="flex items-center gap-1 mb-2">
            {formatButtons.slice(0, 4).map((button, index) => (
              <Button
                key={`format-${index}`}
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
            
            <Separator orientation="vertical" className="h-6" />
            
            {formatButtons.slice(4, 6).map((button, index) => (
              <Button
                key={`list-${index}`}
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
            
            <Separator orientation="vertical" className="h-6" />
            
            {alignmentButtons.map((button, index) => (
              <Button
                key={`align-${index}`}
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
          
          {/* Third Row - Special Elements */}
          <div className="flex items-center gap-1">
            {formatButtons.slice(6).map((button, index) => (
              <Button
                key={`special-${index}`}
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
        </div>
        
        {/* Text Area */}
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[300px] border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
          style={{ fontSize: `${fontSize}px` }}
        />
      </div>
      
      {/* Help Text */}
      <div className="text-xs text-muted-foreground mt-2">
        <p>Rich text editor with HTML formatting support. Use the toolbar buttons to format your content.</p>
        <p>Supports: headings, bold, italic, underline, lists, links, blockquotes, code, and alignment.</p>
      </div>
    </div>
  );
}