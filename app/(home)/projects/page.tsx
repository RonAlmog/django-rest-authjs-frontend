import React from "react";
import ProjectDialog from "./_components/project-dialog";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/colomns";
import { format } from "date-fns";
import Heading from "@/components/heading";
import { Separator } from "@/components/ui/separator";

const ProjectsPage = async () => {
  async function getData(): Promise<Project[]> {
    // Fetch data from your API here.
    return [
      {
        name: "proj1",
        start_date: new Date("1/1/2001"),
        end_date: new Date("1/1/2001"),
        status: "pending",
      },
    ];
  }

  const projects: Project[] = await getData();

  const formattedData = projects.map((p) => ({
    name: p.name,
    start_date: format(p.start_date, "dd/MM/yyyy"),
    end_date: format(p.end_date, "dd/MM/yyyy"),
    status: p.status,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={`products (${projects.length})`}
            description="Manage products for your store"
          />
          <ProjectDialog />
        </div>
        <Separator />

        <DataTable columns={columns} data={formattedData} />
      </div>
    </div>
  );
};

export default ProjectsPage;
