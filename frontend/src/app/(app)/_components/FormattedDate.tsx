"use client"

import { format } from "date-fns";
import { FC } from "react";

interface FormattedDateProps {
  date: string;
}

const FormattedDate: FC<FormattedDateProps> = ({ date }) => {
  const formattedDate = format(new Date(date), "dd/MM/yyyy");
  return <span>{formattedDate}</span>;
};

export default FormattedDate;
