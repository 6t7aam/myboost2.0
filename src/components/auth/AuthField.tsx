import { useState, type ComponentType } from "react";
import { Eye, EyeOff } from "lucide-react";

interface AuthFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  Icon: ComponentType<{ className?: string }>;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  disabled?: boolean;
}

const baseInput =
  "h-12 w-full rounded-xl border border-border bg-secondary/60 pl-11 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25 disabled:opacity-60";

export const AuthField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  Icon,
  autoComplete,
  required,
  minLength,
  disabled,
}: AuthFieldProps) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {label}
    </label>
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        disabled={disabled}
        className={baseInput}
      />
    </div>
  </div>
);

type PasswordFieldProps = Omit<AuthFieldProps, "type">;

export const PasswordField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  Icon,
  autoComplete,
  required,
  minLength,
  disabled,
}: PasswordFieldProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
          disabled={disabled}
          className={`${baseInput} pr-11`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          tabIndex={-1}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-primary"
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
};
