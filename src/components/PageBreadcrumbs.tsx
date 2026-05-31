import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface PageBreadcrumbsProps {
  items: BreadcrumbItem[];
}

const PageBreadcrumbs = ({ items }: PageBreadcrumbsProps) => (
  <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
    <ol className="flex flex-wrap items-center gap-1.5">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <Fragment key={`${item.label}-${index}`}>
            <li>
              {item.to && !isLast ? (
                <Link to={item.to} className="transition-colors hover:text-primary">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "font-semibold text-foreground/85" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
            {!isLast && (
              <li aria-hidden="true">
                <ChevronRight className="h-3 w-3 opacity-60" />
              </li>
            )}
          </Fragment>
        );
      })}
    </ol>
  </nav>
);

export default PageBreadcrumbs;
