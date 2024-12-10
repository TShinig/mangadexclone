import { Mangadex } from "~/api/mangadex/index.server";
import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect, useRef } from "react";
import { Link, useLoaderData, type MetaFunction } from "react-router";
export const meta: MetaFunction = () => [{ title: "Mangadex" }];

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || "1");
  const itemsPerPage = 9;
  const apiOffset = itemsPerPage * (page - 1);

  const { items, total } = await Mangadex().getMangas(apiOffset, itemsPerPage);

  return {
    mangas: items,
    currentPage: page,
    totalPages: total,
  };
};

function CarouselPopularContent({
  id,
  title,
  coverUrl,
  authorName,
  tags,
  description,
  index,
}: any) {
  return (
    <Card key={id} className="w-full overflow-hidden rounded-lg shadow-lg">
      <CardContent className="flex flex-col md:flex-row p-6">
        <img
          src={coverUrl}
          alt={title}
          className="h-72 max-w-48 object-cover"
        />
        <div className="flex flex-col justify-between pl-4">
          <h1 className="mb-2 text-2xl font-semibold">{title}</h1>
          <div className="mb-2 flex gap-2 text-sm text-gray-500">
            {tags.map((tag: string, tagIndex: number) => (
              <span
                key={tagIndex}
                className="mx-2 rounded bg-gray-200 px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="mb-4 text-sm text-gray-700">{description}</p>
          <p className="text-sm italic text-gray-500">{authorName}</p>
          <span className="mt-4 text-xl text-gray-500">NO. {index + 1}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function PopularContent() {
  const { mangas } = useLoaderData<typeof loader>();
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel className="w-full p-4 text-black" plugins={[plugin.current]}>
      <h1 className="mb-4 text-2xl font-bold">
        Popular New Titles
      </h1>

      <CarouselContent className="w-full">
        {mangas?.map((item: any, index: any) => (
          <CarouselItem key={item.id} className="w-full">
            <Link to={`manga/${item.id}`}>
              <CarouselPopularContent {...item} index={index} />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

function LatestUpdates() {
  const { mangas } = useLoaderData<typeof loader>();
  return (
    <section className="p-4 text-black">
      <h1 className="text-2xl font-bold">Últimas Atualizações</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {mangas?.map((item: any, index: any) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-lg bg-gray-100 p-4 shadow-md transition hover:bg-gray-200"
          >
            <Link
              to={`manga/${item.id}`}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={item.coverUrl}
                alt={item.title}
                className="h-20 w-16 rounded-lg object-cover md:h-24 md:w-20"
              />
              <div className="flex-1">
                <h2 className="max-w-[44ch] truncate text-sm font-semibold md:text-lg">
                  {item.title}
                </h2>
                <p className="text-xs text-gray-400 md:text-sm">
                  {isNaN(Number(item.latestChapter))
                    ? item.latestChapter
                    : `Cap. ${item.latestChapter}`}
                </p>
                <p className="text-xs italic text-gray-500">
                  {item.authorName}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function Featured() {
  const { mangas } = useLoaderData<typeof loader>();

  return (
    <section className="mt-1 p-4 text-white md:overflow-hidden">
      <h1 className="text-2xl font-bold mb-4">Featured</h1>
      <div className="flex w-auto space-x-4 overflow-hidden">
        {mangas?.map((item: any, index: any) => (
          <div
            key={index}
            className="w-40 flex-shrink-0 rounded-lg bg-gray-100 p-4 shadow-md"
          >
            <Link
              to={`manga/${item.id}`}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={item.coverUrl}
                alt={item.title}
                className="h-48 w-full rounded-lg object-cover"
              />
              <h2 className="mt-2 truncate text-center text-sm font-semibold">
                {item.title}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function RecentlyAdded() {
  const { mangas } = useLoaderData<typeof loader>();

  return (
    <section className="mt-1 p-4 text-white">
      <h1>Recently Added</h1>
      <div className="flex w-auto space-x-4 overflow-hidden">
        {mangas?.map((item: any, index: any) => (
          <div
            key={index}
            className="w-40 flex-shrink-0 rounded-lg bg-gray-100 p-4 shadow-md"
          >
            <Link
              to={`manga/${item.id}`}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={item.coverUrl}
                alt={item.title}
                className="h-48 w-full rounded-lg object-cover"
              />
              <h2 className="mt-2 truncate text-center text-sm font-semibold">
                {item.title}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <section>
      <PopularContent />
      <LatestUpdates />
      <Featured />
      <RecentlyAdded />
    </section>
  );
}

/** Componentes interessantes
 * Pagination
 * Navigation Menu
 * Menu Bar
 * Separator
 * Hover Card
 * Form
 * Dropdown Menu
 * Dialog
 * Combobox
 * Card
 * Avatar
 * Sidebar
 * Carousel
 */
