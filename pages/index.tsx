import React from "react";
import clsx from "clsx";
import {
  ClearRefinements,
  Hits,
  HitsPerPage,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
  SortBy,
  Stats,
} from "react-instantsearch-dom";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import Hit from "~/components/Hit";

const navigation = [
  { name: "Products", href: "#", current: true },
  { name: "Wishlist", href: "#", current: false },
];

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "xSA2RSbevwkLljzQ8kCDX6NsxoTnHXNZ",
    nodes: [
      {
        host: "f05hglcz7e4ks3x9p-1.a1.typesense.net",
        port: 443,
        protocol: "https",
      },
    ],
    cacheSearchResultsForSeconds: 2 * 60,
  },
  additionalSearchParameters: {
    query_by: "name, category",
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="px-8 mx-auto shadow-sm max-w-7xl">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex space-x-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      item.current
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                      "inline-flex items-center px-2 border-b-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-10">
        <header className="mb-4">
          <div className="px-8 mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <InstantSearch indexName="products" searchClient={searchClient}>
          <div className="flex justify-between gap-16 px-8">
            <aside className="pt-8 max-w-fit">
              <h3 className="text-xl font-bold">Filter by Categories</h3>
              <RefinementList
                className="mt-3"
                attribute="category"
                limit={3}
                showMore={true}
                showMoreLimit={10}
                searchable={true}
                transformItems={(items: any[]) =>
                  items.sort((a, b) => (a.label > b.label ? 1 : -1))
                }
              />
              <ClearRefinements className="mt-5" />
            </aside>
            <main className="flex flex-col items-center self-center w-full">
              <div className="w-full my-8">
                <div className="mb-8">
                  <SearchBox />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <Stats
                    translations={{
                      stats(nbHits, processingTimeMS) {
                        let hitCountPhrase;
                        if (nbHits === 0) {
                          hitCountPhrase = "No products";
                        } else if (nbHits === 1) {
                          hitCountPhrase = "1 product";
                        } else {
                          hitCountPhrase = `${nbHits.toLocaleString()} products`;
                        }
                        return `${hitCountPhrase} found in ${processingTimeMS.toLocaleString()}ms`;
                      },
                    }}
                  />
                  <HitsPerPage
                    className="ms-4"
                    items={[
                      { label: "9 per page", value: 9 },
                      { label: "18 per page", value: 18 },
                    ]}
                    defaultRefinement={9}
                  />
                  <SortBy
                    items={[
                      { label: "Relevancy", value: "products" },
                      {
                        label: "Price (asc)",
                        value: "products/sort/price:asc",
                      },
                      {
                        label: "Price (desc)",
                        value: "products/sort/price:desc",
                      },
                    ]}
                    defaultRefinement="products"
                  />
                </div>

                <Hits hitComponent={Hit} />
              </div>
              <Pagination />
            </main>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
};

export default Home;
