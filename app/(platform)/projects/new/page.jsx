"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  ChevronDown, 
  HelpCircle, 
  UploadCloud, 
  FileText, 
  X,
  Loader2,
  Check,
  BrainCircuit,
  Settings2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Main Page Component ---

export default function CreateProjectPage() {
  const [saveStatus, setSaveStatus] = useState("idle"); // 'idle', 'saving', 'saved'
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // --- Form State ---
  // We use useState for all fields for simplicity
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [projectType, setProjectType] = useState("milestone"); // 'fixed', 'hourly', 'milestone'
  const [budget, setBudget] = useState("");
  const [currency, setCurrency] = useState("FLOW");
  const [skills, setSkills] = useState([]); // Array of skill tags
  const [skillInput, setSkillInput] = useState("");
  const [milestones, setMilestones] = useState([
    { id: 1, name: "", description: "", payment: 50 },
  ]);
  const [files, setFiles] = useState([]); // Array of file objects
  
  // --- Auto-save Logic (Simulated) ---
  const formData = { title, category, description, projectType, budget, currency, skills, milestones };
  useEffect(() => {
    // Don't save on initial render
    if (title === "" && description === "" && budget === "") return;
    
    setSaveStatus("saving");
    const handler = setTimeout(() => {
      // In a real app, this would save to localStorage
      console.log("Autosaving draft...", formData);
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 2000); // Save 2s after user stops typing
    
    return () => clearTimeout(handler);
  }, [title, category, description, projectType, budget, currency, skills, milestones]); // Re-run effect when any field changes

  // --- Milestone Handlers ---
  const addMilestone = () => {
    if (milestones.length >= 5) return; // Max 5 milestones
    const newId = milestones.length > 0 ? Math.max(...milestones.map(m => m.id)) + 1 : 1;
    setMilestones([...milestones, { id: newId, name: "", description: "", payment: 0 }]);
  };
  
  const removeMilestone = (id) => {
    if (milestones.length <= 1) return; // Must have at least one
    setMilestones(milestones.filter(m => m.id !== id));
  };
  
  const updateMilestone = (id, field, value) => {
    setMilestones(milestones.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };
  
  // --- Skill Tag Handlers ---
  const addSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim() !== "") {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };
  
  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  // --- File Upload Handler ---
  const handleFileDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    // Add file validation here (size, type)
    setFiles(prev => [...prev, ...newFiles].slice(0, 10)); // Max 10 files
  };
  
  const removeFile = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  // --- Form Submit ---
  const handleSubmit = (e) => {
    e.preventDefault();
    // --- SIMULATED WEB3 LOGIC ---
    console.log("Submitting Project...", formData);
    setSaveStatus("saving");
    // Show loading spinner
    setTimeout(() => {
      // Show success
      setSaveStatus("saved");
      console.log("Project posted! Trigger wallet confirmation.");
      // In a real app, you would now trigger fcl.mutate()
      // and redirect to the project page on success.
    }, 2500);
    // --- END SIMULATION ---
  };

  const totalMilestonePayment = milestones.reduce((sum, m) => sum + Number(m.payment || 0), 0);
  const platformFee = (Number(budget || 0) * 0.025).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* --- Sticky Header --- */}
      <div className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-lg py-4 mb-8 border-b border-gray-700/50">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Post a New Project</h1>
          <div className="flex items-center h-6">
            {saveStatus === 'saving' && <span className="text-sm text-gray-400 flex items-center"><Loader2 className="w-4 h-4 mr-2 animate-spin"/> Saving...</span>}
            {saveStatus === 'saved' && <span className="text-sm text-accent flex items-center"><Check className="w-4 h-4 mr-2"/> Draft saved!</span>}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* --- Section 1: Project Basics --- */}
        <FormSection title="Project Basics" subtitle="What do you need done?">
          <FormInput label="Title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              placeholder="e.g., Build an NFT minting site"
              required
            />
          </FormInput>

          <FormInput label="Category">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field" 
              required
            >
              <option value="">Select category...</option>
              <option value="dev">Web Development</option>
              <option value="design">Design & UI/UX</option>
              <option value="writing">Writing & Content</option>
              <option value="marketing">Marketing</option>
            </select>
          </FormInput>

          <FormInput label="Description">
            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-field min-h-[150px]"
                placeholder="Describe your project in detail..."
                required
              />
              <button 
                type="button" 
                className="absolute top-2 right-2 text-xs bg-primary/20 text-primary hover:bg-primary/30 font-medium py-1 px-2 rounded-md flex items-center"
              >
                <BrainCircuit className="w-4 h-4 mr-1" /> AI Assist
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">Supports Markdown for formatting.</p>
          </FormInput>
        </FormSection>

        {/* --- Section 2: Scope & Timeline --- */}
        <FormSection title="Scope & Budget" subtitle="How will this project work?">
          <FormInput label="Project Type">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ProjectTypeCard
                title="Fixed Price"
                description="One-time payment for a set scope."
                isActive={projectType === 'fixed'}
                onClick={() => setProjectType('fixed')}
              />
              <ProjectTypeCard
                title="Hourly"
                description="Pay by the hour (requires time tracking)."
                isActive={projectType === 'hourly'}
                onClick={() => setProjectType('hourly')}
              />
              <ProjectTypeCard
                title="Milestone-Based"
                description="Pay as work is completed in stages."
                isActive={projectType === 'milestone'}
                isRecommended={true}
                onClick={() => setProjectType('milestone')}
              />
            </div>
          </FormInput>
          
          <FormInput label="Budget">
            <div className="flex">
              <select 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="input-field rounded-r-none w-28"
              >
                <option>FLOW</option>
                <option>USDC</option>
                <option>DAI</option>
              </select>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="input-field rounded-l-none"
                placeholder="500"
                required
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">e.g., Total project budget. ($50.00 USD equivalent)</p>
          </FormInput>
          
          {/* --- Milestone Creator --- */}
          <AnimatePresence>
            {projectType === 'milestone' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <FormInput label="Milestones">
                  <div className="space-y-4 p-4 bg-gray-900/50 border border-gray-700/50 rounded-lg">
                    {milestones.map((milestone, index) => (
                      <MilestoneInput
                        key={milestone.id}
                        milestone={milestone}
                        onChange={updateMilestone}
                        onRemove={removeMilestone}
                        canRemove={milestones.length > 1}
                      />
                    ))}
                    {milestones.length < 5 && (
                      <button
                        type="button"
                        onClick={addMilestone}
                        className="text-sm font-medium text-primary hover:underline flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Milestone
                      </button>
                    )}
                    {totalMilestonePayment !== 100 && (
                       <p className="text-sm text-error mt-2">
                         Milestone payments must add up to 100%. (Current: {totalMilestonePayment}%)
                       </p>
                    )}
                  </div>
                </FormInput>
              </motion.div>
            )}
          </AnimatePresence>
        </FormSection>

        {/* --- Section 3: Requirements --- */}
        <FormSection title="Requirements" subtitle="What skills are you looking for?">
          <FormInput label="Skills Needed">
            <div className="input-field flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill} className="flex items-center bg-primary/20 text-primary text-sm font-medium px-2 py-1 rounded-full">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="ml-1.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={addSkill}
                className="bg-transparent flex-1 outline-none min-w-[150px]"
                placeholder="Type a skill and press Enter"
              />
            </div>
          </FormInput>
          
          <FormInput label="Attachments">
            <FileUploadZone onDrop={handleFileDrop} />
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map(file => (
                  <div key={file.name} className="flex justify-between items-center bg-gray-700/50 p-2 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm text-white">{file.name}</span>
                      <span className="text-xs text-gray-500 ml-2">({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <button type="button" onClick={() => removeFile(file.name)}>
                      <X className="w-4 h-4 text-gray-500 hover:text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </FormInput>
        </FormSection>
        
        {/* --- Section 4: Advanced Settings --- */}
        <div>
          <button
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="flex items-center text-lg font-semibold text-white"
          >
            <Settings2 className="w-5 h-5 mr-2" />
            Smart Contract Settings (Advanced)
            <ChevronDown 
              className={`w-5 h-5 ml-2 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} 
            />
          </button>
          
          <AnimatePresence>
            {isAdvancedOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-6 pl-2 border-l-2 border-gray-700/50"
              >
                <div className="space-y-6 ml-4">
                  <FormInput label="Dispute Arbitration">
                    <FormTooltip text="Who resolves issues? 'Community DAO' is recommended for fairness." />
                    <select className="input-field">
                      <option>Community DAO (Default)</option>
                      <option>Private Arbitrator (Specify wallet)</option>
                    </select>
                  </FormInput>

                  <div className="flex items-center">
                    <input id="yield-toggle" type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-primary focus:ring-primary" />
                    <label htmlFor="yield-toggle" className="ml-3 text-sm text-white">
                      Earn interest on escrowed funds (~5% APY)
                    </label>
                    <FormTooltip text="Your locked funds will be staked in a secure, low-risk protocol." />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- Section 5: Review & Post --- */}
        <div className="border-t border-gray-700/50 pt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Review & Post</h2>
          <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Project Budget</span>
              <span className="text-white font-medium">{budget || 0} {currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Platform Fee (2.5%)</span>
              <span className="text-white font-medium">{platformFee} {currency}</span>
            </div>
            <div className="border-t border-gray-700/50 my-2"></div>
            <div className="flex justify-between">
              <span className="text-lg font-bold text-white">Total Deposit Required</span>
              <span className="text-lg font-bold text-accent">
                {(Number(budget || 0) + Number(platformFee)).toFixed(2)} {currency}
              </span>
            </div>
            
            <div className="flex items-start pt-4">
              <input id="terms" type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-primary focus:ring-primary mt-1" required />
              <label htmlFor="terms" className="ml-3 text-sm text-gray-300">
                I agree to the SkillFlow Terms of Service and understand that funds will be locked in an escrow smart contract.
              </label>
            </div>
            
            <button
              type="submit"
              disabled={saveStatus === 'saving'}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {saveStatus === 'saving' ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                'Post Project & Fund Escrow'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}


// --- Sub-Components ---
// (Keeping these in the same file for simplicity)

// A wrapper for each form section
function FormSection({ title, subtitle, children }) {
  return (
    <div className="border-b border-gray-700/50 pb-10">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="text-sm text-gray-400 mb-6">{subtitle}</p>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

// A reusable label + input wrapper
function FormInput({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

// A card for the project type radio buttons
function ProjectTypeCard({ title, description, isActive, isRecommended, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative p-5 text-left rounded-xl border-2 transition-all
        ${isActive ? 'bg-primary/10 border-primary' : 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600'}
      `}
    >
      {isRecommended && (
        <span className="absolute -top-3 right-3 text-xs font-medium bg-accent text-gray-900 px-2 py-0.5 rounded-full">
          Recommended
        </span>
      )}
      <h3 className="text-md font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </button>
  );
}

// The dynamic input row for a single milestone
function MilestoneInput({ milestone, onChange, onRemove, canRemove }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
      <input
        type="text"
        placeholder="Milestone Name"
        value={milestone.name}
        onChange={(e) => onChange(milestone.id, 'name', e.target.value)}
        className="input-field md:col-span-5"
      />
      <input
        type="text"
        placeholder="Description"
        value={milestone.description}
        onChange={(e) => onChange(milestone.id, 'description', e.target.value)}
        className="input-field md:col-span-5"
      />
      <div className="flex md:col-span-2">
        <input
          type="number"
          placeholder="50"
          value={milestone.payment}
          onChange={(e) => onChange(milestone.id, 'payment', e.target.value)}
          className="input-field rounded-r-none w-full"
        />
        <span className="input-field rounded-l-none bg-gray-800 border-gray-700">%</span>
        {canRemove && (
          <button type="button" onClick={() => onRemove(milestone.id)} className="ml-2 text-gray-500 hover:text-error">
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

// The drag-and-drop file upload zone
function FileUploadZone({ onDrop }) {
  return (
    <div 
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-700/50 rounded-xl bg-gray-900/50 text-center"
    >
      <UploadCloud className="w-10 h-10 text-gray-500 mb-2" />
      <p className="text-sm font-medium text-white">Drag & drop files here</p>
      <p className="text-xs text-gray-400">or click to browse</p>
      <input type="file" className="hidden" multiple />
      <p className="text-xs text-gray-500 mt-2">Max 10 files, 25MB total. (Uploaded to IPFS)</p>
    </div>
  );
}

// A simple (?) icon tooltip
function FormTooltip({ text }) {
  return (
    <span className="inline-block ml-2 relative group">
      <HelpCircle className="w-4 h-4 text-gray-500" />
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 w-48 p-2 bg-gray-900 border border-gray-700 text-xs text-gray-300 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity mb-2 z-10">
        {text}
      </span>
    </span>
  );
}