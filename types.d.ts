interface Project {
  name: string;
  start_date: Date;
  end_date: Date;
  comments?: string;
  status?: string;
}

interface SafeProject {
  name: string;
  start_date: string;
  end_date: string;
  comments?: string;
  status?: string;
}
