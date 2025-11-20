export default function ArticleCard({ article }) {
  return (
    <div
      className="cursor-pointer rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      dir="rtl"
    >
      <h3 className="mb-3 font-[Alexandria] text-xl font-bold text-[#023f3e]">
        {article.title}
      </h3>
      <p className="font-[Alexandria] text-base leading-relaxed text-[#0b5a59]">
        {article.summary}
      </p>
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="mt-4 h-48 w-full rounded-lg object-cover"
        />
      )}
    </div>
  );
}