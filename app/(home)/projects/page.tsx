"use client";

import ProjectDialog from "./_components/project-dialog";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/colomns";
import { format } from "date-fns";
import Heading from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { getProjects } from "@/actions/get-projects";
import { useEffect, useState } from "react";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<SafeProject[]>([]);

  useEffect(() => {
    const getThePrjects = async () => {
      try {
        const data = await getProjects();
        if (data) {
          const formattedData = data.map((p: Project) => ({
            name: p.name,
            start_date: format(p.start_date, "dd/MM/yyyy"),
            end_date: format(p.end_date, "dd/MM/yyyy"),
            status: p.status,
          }));

          setProjects(formattedData);
        }
      } catch (error) {}
    };

    getThePrjects();
  }, []);

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

        <DataTable columns={columns} data={projects} />
      </div>
    </div>
  );
};

export default ProjectsPage;
