type Props = {
  title: string;
  description: string;
  imageUrl?: string;
};

export default function InvitationCard({ title, description, imageUrl }: Props) {
  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md p-4 mb-4">
      {imageUrl && <img src={imageUrl} alt={title} className="rounded-t-lg mb-2" />}
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
