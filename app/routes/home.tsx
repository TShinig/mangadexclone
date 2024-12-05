import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Mangadex } from "~/api/mangadex/index.server";
import { Link, useLoaderData, type MetaFunction } from "react-router";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

export const meta: MetaFunction = () => [{ title: "Quantum Mangás" }];

export const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || "1");
  const itemsPerPage = 9; // Número de itens por página
  const apiOffset = itemsPerPage * (page - 1); // const offset = (page - 1) * limit;

  const { items, total } = await Mangadex().getMangas(apiOffset, itemsPerPage);

  return {
    mangas: items,
    currentPage: page,
    totalPages: total,
  };
};

interface MangaCardProps {
  id: string;
  title: string;
  coverUrl: string;
  authorName: string;
  tags: string | any;
  status: string;
  latestChapter: string;
}

function MangaCard({
  id,
  title,
  coverUrl,
  authorName,
  tags,
  status,
  latestChapter,
}: MangaCardProps) {
  return (
    <li key={id}>
      <Link
        to={`manga/${id}`}
        className="hover:shadow-lg transition-shadow duration-300"
      >
        <Card className="p-4 w-full space-y-1">
          <img
            src={coverUrl}
            alt={title}
            className="w-full h-auto object-cover"
          />
          <CardHeader>{title}</CardHeader>
          <CardContent>
            <p>
              <strong>Autor:</strong> {authorName}
            </p>
            <p>
              <strong>Status:</strong> {status}
            </p>
            <p>
              <strong>Último Capítulo:</strong> {latestChapter}
            </p>
            <p>
              <strong>Tags:</strong> {tags.join(", ")}
            </p>
          </CardContent>
        </Card>
      </Link>
    </li>
  );
}

export default function Index() {
  const { mangas, currentPage, totalPages } = useLoaderData<typeof loader>();

  return (
    <main className="bg-cream dark:bg-neutral-900 text-sm text-gray-800 dark:text-gray-300">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {mangas.map((item: any) => (
          <MangaCard key={item.id} {...item} />
        ))}
      </ul>
      <div className="flex justify-center py-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`/?page=${currentPage > 1 ? currentPage - 1 : 1}`}
              />
            </PaginationItem>
            {Array.from({ length: Math.min(3, totalPages) }, (_, index) => {
              // Calcular o número da página exibida
              const pageNumber =
                Math.max(1, currentPage - Math.floor((3 - 1) / 2)) + index;

              // Evitar ultrapassar o número total de páginas
              if (pageNumber > totalPages) return null;

              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href={`/?page=${pageNumber}`}
                    isActive={currentPage === pageNumber}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            <PaginationItem>
              <PaginationNext
                href={`/?page=${
                  currentPage < totalPages ? currentPage + 1 : totalPages
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
}
