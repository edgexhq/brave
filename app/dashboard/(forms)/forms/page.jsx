import CreateForm from "@/components/forms/CreateForm";
import FormList from "@/components/forms/FormList";

function Dashboard() {
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl flex items-center justify-between">
        Your Forms :
        <CreateForm />
      </h2>
      <FormList />
    </div>
  );
}

export default Dashboard;
