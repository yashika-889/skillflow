import { Briefcase, User } from "lucide-react";

export default function Step1Welcome({ onNext, setUserType }) {
  
  const handleSelect = (userType) => {
    setUserType(userType);
    onNext();
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-white mb-4">
        Welcome to SkillFlow! 🚀
      </h1>
      <p className="text-lg text-neutral-300 mb-8">
        Let's get you started. What brings you here?
      </p>
      <div className="space-y-4">
        <RoleButton
          icon={<User className="w-6 h-6" />}
          title="I'm a Client"
          subtitle="I want to hire talent for a project."
          onClick={() => handleSelect("client")}
        />
        <RoleButton
          icon={<Briefcase className="w-6 h-6" />}
          title="I'm a Freelancer"
          subtitle="I'm looking for work."
          onClick={() => handleSelect("freelancer")}
        />
      </div>
    </div>
  );
}

// Sub-component for the role buttons
function RoleButton({ icon, title, subtitle, onClick }) {
  return (
    <button
      onClick={onClick}
      className="action-card" // Uses the style from globals.css
    >
      <div className="flex items-center justify-center w-12 h-12 mr-5 bg-primary/20 text-primary rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-neutral-400">{subtitle}</p>
      </div>
    </button>
  );
}