import React from "react";
import Entry from "@/components/myaccount/Entry";

interface PersonalInformationProps {
  entries: string[];
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  entries,
}) => {
  return (
    <div className="w-full xl:w-[452px] p-5 bg-white rounded-lg shadow border border-gray-200 flex-col justify-start items-start gap-5 inline-flex">
      <section className="w-full">
        <h2 className="text-[#111012]  text-lg lg:text-2xl font-semibold text-poppins leading-loose">
          Personal Information
        </h2>
      </section>
      <section className="w-full flex-col gap-5">
        {entries.map((entry) => (
          <Entry title={entry} key={entry} />
        ))}
      </section>
    </div>
  );
};

export default PersonalInformation;
