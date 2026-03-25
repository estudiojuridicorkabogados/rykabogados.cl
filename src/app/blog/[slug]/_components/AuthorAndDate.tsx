import { format } from "date-fns";
import { es } from "date-fns/locale";
import Image from "next/image";

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
      <div className="h-13 w-13 bg-gray-300 relative rounded-full">
        <Image
          fill
          src={author?.photo?.url || ""}
          alt={author?.photo?.title || author?.photo?.description || "Autore"}
          className="object-cover rounded-full"
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
              {format(date, "MMM d, yyyy", { locale: es })}
            </time>
          ) : null}
          {" • "}
          {timeToRead} min de lectura
        </span>
      </div>
    </div>
  );
};
