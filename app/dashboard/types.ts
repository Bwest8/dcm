export interface Template {
  full_name: string;
  base_name: string;
  doc_path: string;
}

export interface TemplateInfo {
  template: Template;
  status: string;
  requirement_description: string;
}

export interface Collection {
  name: string;
  collection_window: string;
  school_year: string;
  description: string;
  comments: string | null;
  collection_type: string;
  how_to_doc_path: string | null;
  templates: TemplateInfo[];
  collection_opens: string;
  collection_closes: string;
  final_collection_closes: string;
  pde_review_window: string;
  correction_window: string;
  acs_information: string;
}