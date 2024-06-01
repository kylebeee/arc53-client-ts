import Arc53CreateFileButton from "@/components/buttons/create-arc53-file-button";
import Arc53DataForm from "@/components/forms/arc53-data-form";

export default function Home() {
  return (
    <div>
      <h1>ARC53 METADATA BUILDER</h1>
      <Arc53DataForm />
      <Arc53CreateFileButton />
    </div>
  );
}
