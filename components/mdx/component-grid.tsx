// components/ComponentsGrid.tsx
'use client';

import Link from "next/link";
import type {Registry} from "shadcn/registry"
import { Index } from "@/__registry__";

export function ComponentsGrid() {
  const components = Object.entries(Index).filter(([_key, component]) => 
    component.type === 'registry:component'
  );

  const apiRoutes = Object.entries(Index).filter(([_key, component]) => 
    component.type === 'registry:lib'
  );

  return (
    <div className="space-y-8">
      {/* API Routes Section */}
      {apiRoutes.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">API Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apiRoutes.map(([name, component]) => (
              <ComponentCard 
                key={name}
                name={name}
                component={component}
                isApi={true}
              />
            ))}
          </div>
        </section>
      )}

      {/* Components Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Functional Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map(([name, component]) => (
            <ComponentCard 
              key={name}
              name={name}
              component={component}
            />
          ))}
        </div>
      </section>


    </div>
  );
}

function ComponentCard({ 
  name, 
  component, 
  isApi = false 
}: { 
  name: string;
  component: Registry["items"][number];
  isApi?: boolean;
}) {
  return (
    <Link 
      href={isApi ? `/docs/api-routes/${name}` : `/docs/components/${name}`}
      className="inline-block  p-6 border rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200 bg-card text-card-foreground"
      style={{
        textDecoration: 'none',
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg capitalize">
          {name.replace(/-/g, ' ')}
        </h3>
        {isApi && (
          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md">
            API
          </span>
        )}
      </div>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {component.description}
      </p>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {component.files?.length || 0} file{component.files?.length !== 1 ? 's' : ''}
        </span>
        <span className="text-blue-600 hover:text-blue-800 font-medium">
          View Details →
        </span>
      </div>
    </Link>
  );
}