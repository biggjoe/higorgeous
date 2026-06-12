const fs = require('fs');

const replacements = {
  'src/app/(dashboard)/layout.tsx': `import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
`,
  'src/app/(dashboard)/admin/accounts/user-details.tsx': `"use client";

import Link from "next/link";

export default function UserDetails({ user }: { user: any }) {
  return (
    <section className="page-body">
      <div className="dashboard-page-title">
        <div className="breadcrumbs">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/accounts">Accounts</Link>
          <span>{user?.name ?? "User"}</span>
        </div>
      </div>
      <p className="px10">User details are available here.</p>
    </section>
  );
}
`,
  'src/app/(dashboard)/admin/accounts/user-list.tsx': `"use client";

import Link from "next/link";

export default function UserList({ users }: { users: any[] }) {
  return (
    <section className="page-body">
      <div className="dashboard-page-title">
        <div className="breadcrumbs">
          <Link href="/admin">Dashboard</Link>
          <span>Accounts</span>
        </div>
      </div>
      <div className="pt30">
        {(users ?? []).map((item: any) => (
          <Link key={item?.id ?? item?.name} className="list-item br-5 flex flex-row align-items-center" href={'/admin/accounts/v/' + (item?.id ?? '')}>
            <span className="spacer ml10">{item?.name ?? "User"}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
`,
  'src/app/(dashboard)/admin/distributors/ui/all-distributors.tsx': `export default function AllDistributors() {
  return <div className="page-body">All distributors</div>;
}
`,
  'src/app/(dashboard)/admin/distributors/ui/edit-distributors.tsx': `export default function EditDistributors() {
  return <div className="page-body">Edit distributors</div>;
}
`,
  'src/app/(dashboard)/admin/distributors/ui/list-distributors.tsx': `export default function ListDistributors() {
  return <div className="page-body">List distributors</div>;
}
`,
  'src/app/(dashboard)/admin/faq/ui/faq-edit.tsx': `export default function FaqEdit() {
  return <div className="page-body">Edit FAQ</div>;
}
`,
  'src/app/(dashboard)/admin/faq/ui/faq-list.tsx': `export default function FaqList() {
  return <div className="page-body">FAQ list</div>;
}
`,
  'src/app/(dashboard)/admin/products/page.tsx': `export default function ProductsPage() {
  return <div className="page-body">Products</div>;
}
`,
  'src/app/(dashboard)/admin/products/new/page.tsx': `export default function NewProductPage() {
  return <div className="page-body">New product</div>;
}
`,
  'src/app/(dashboard)/admin/products/newcategory/page.tsx': `export default function NewCategoryPage() {
  return <div className="page-body">New category</div>;
}
`,
  'src/app/(dashboard)/admin/products/ui/edit-product.tsx': `export default function EditProduct() {
  return <div className="page-body">Edit product</div>;
}
`,
  'src/app/ui/ShareTemplate.tsx': `export default function ShareTemplate() {
  return <div className="page-body">Share</div>;
}
`,
  'src/app/ui/all-products.tsx': `export default function AllProducts() {
  return <div className="page-body">All products</div>;
}
`,
  'src/app/ui/dialog.tsx': `export default function Dialog() {
  return null;
}
`,
};

for (const [rel, text] of Object.entries(replacements)) {
  fs.writeFileSync(rel, text, 'utf8');
}

console.log('Repaired', Object.keys(replacements).length, 'files');
