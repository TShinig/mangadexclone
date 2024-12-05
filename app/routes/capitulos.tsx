import { Link, useLoaderData } from "react-router";
import { Mangadex } from "~/api/mangadex/index.server";
import { Route } from "./+types/capitulos";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { chapterId } = params;

  try {
    const chapterImages = await Mangadex().getChapterImages(chapterId);
    if (!chapterImages.length) {
      throw new Error("Nenhuma imagem encontrada.");
    }
    return chapterImages;
  } catch (error) {
    throw new Response("Capítulo não encontrado", { status: 404 });
  }
};


export default function ChapterFullScreen() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div className="fixed inset-0 bg-cream dark:bg-black bg-opacity-90 overflow-auto z-50">
      <Link
        to={-1}
        className="fixed top-4 right-4 text-white text-3xl bg-neutral-800 p-2 rounded-full z-50"
      >
        X
      </Link>

      <div className="flex flex-col items-center p-6 space-y-4">
        {loaderData.map((url: string, index: number) => (
          <img
            key={index}
            src={url}
            alt={`Page ${index + 1}`}
            className="w-full h-auto object-cover"
          />
        ))}
      </div>
    </div>
  );
}
