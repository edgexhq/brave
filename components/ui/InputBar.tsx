import { X } from "lucide-react";
import { Button } from "./button";

export default function InputBar({ emails, setEmails }: any) {
  const handleDelete = (id: any) => {
    setEmails(emails.filter((email: any) => email.id !== id));
  };
  console.log(emails);
  return (
    <div className="container mx-auto p-1">
      <div className="flex flex-wrap gap-4">
        {emails.length === 0 ? (
          <p className="text-gray-500 text-center w-full">No emails added</p>
        ) : null}
        {emails.map((email: any) => (
          <div
            key={email.id}
            className="bg-white flex items-center justify-center gap-1 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 pl-3 text-sm"
          >
            <p>{email.receiver}</p>
            <Button
              size={"icon"}
              variant="destructive"
              onClick={() => handleDelete(email.id)}
            >
              <X />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
