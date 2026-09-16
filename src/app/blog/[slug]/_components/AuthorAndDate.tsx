import { es } from "date-fns/locale";
import Image from "next/image";

import { formatSantiago } from "@/lib/utils/dates";
import { optimizedContentfulImageUrl } from "@/lib/utils/images";
import { Maybe } from "@/types/generated/graphql";
import { Author } from "@/types/global";

interface AuthorAndDateProps {
  author?: Maybe<Author>;
  date?: Maybe<string>;
  timeToRead?: number;
}

export const AuthorAndDate: React.FC<AuthorAndDateProps> = ({
  author,
  date,
  timeToRead,
}) => {
  return (
    <div className="flex flex-row gap-4">
      <div className="relative h-13 w-13 rounded-full bg-gray-300">
        <Image
          fill
          src={optimizedContentfulImageUrl(author?.photo?.url) || ""}
          alt={author?.photo?.title || author?.photo?.description || "Autore"}
          sizes="52px"
          className="rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col">
        <span>{author?.name}</span>

        <span className="-mt-x">
          {date ? (
            <time
              dateTime={date}
              className="text-base/7 font-semibold capitalize"
            >
              {formatSantiago(date, "MMM d, yyyy", { locale: es })}
            </time>
          ) : null}
          {" • "}
          {timeToRead} min de lectura
        </span>
      </div>
    </div>
  );
};
