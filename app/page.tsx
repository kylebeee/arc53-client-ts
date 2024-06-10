import Arc53DataForm from "@/components/forms/arc53-data-form";
import VerticalStepper from "@/components/steppers/vertical";
import FormDisplayProvider from "@/providers/form-display";

export default function Home() {
  return (
    <FormDisplayProvider>
      <div className="p-4">
        <VerticalStepper />
        <div className="pl-80 pt-12 h-full w-full">
          <Arc53DataForm />
        </div>
      </div>
    </FormDisplayProvider>
  );
}
