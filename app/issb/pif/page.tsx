"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Users, GraduationCap, Trophy, FileText, CheckCircle2 } from 'lucide-react';

const emptyPIF = {
  // Step 1: Personal
  fullName: '',
  chestNo: '',
  batchNo: '',
  dob: '',
  age: '',
  religion: '',
  sect: '',
  caste: '',
  placeOfBirth: '',
  domicile: '',
  height: '',
  weight: '',
  bloodGroup: '',
  identificationMark: '',
  maritalStatus: 'Unmarried',
  presentAddress: '',
  permanentAddress: '',
  
  // Step 2: Family
  fatherName: '',
  fatherAlive: 'Alive',
  fatherEducation: '',
  fatherOccupation: '',
  fatherIncome: '',
  motherName: '',
  motherAlive: 'Alive',
  motherEducation: '',
  motherOccupation: '',
  numberOfBrothers: '',
  numberOfSisters: '',
  birthOrder: '',
  siblingDetails: '',

  // Step 3: Academics
  matricInstitution: '',
  matricYear: '',
  matricMarks: '',
  matricDivision: '',
  fscInstitution: '',
  fscYear: '',
  fscMarks: '',
  fscDivision: '',
  bachelorsInstitution: '',
  bachelorsYear: '',
  bachelorsMarks: '',
  bachelorsDivision: '',

  // Step 4: Interests
  gamesPlayed: '',
  sportsPositions: '',
  hobbies: '',
  clubsSocieties: '',

  // Step 5: Misc
  previousIssbAttempts: '',
  foreignTravels: '',
  policeRecord: 'No',
  choiceOfService: 'Army',
  motivation: ''
};

export default function PifFormPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(emptyPIF);
  const [isClient, setIsClient] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedData = localStorage.getItem('issb_complete_pif');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (e) {
        console.error("Error parsing PIF data");
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveAndNext = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('issb_complete_pif', JSON.stringify(formData));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    
    if (step < 5) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/issb/dp-interview/ai-mock');
    }
  };

  if (!isClient) return null;

  const steps = [
    { id: 1, title: 'Personal', icon: User },
    { id: 2, title: 'Family', icon: Users },
    { id: 3, title: 'Academics', icon: GraduationCap },
    { id: 4, title: 'Interests', icon: Trophy },
    { id: 5, title: 'Misc', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 selection:bg-[#B8212E] selection:text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-8">
        
        {/* Header */}
        <div className="space-y-4">
          <Link href="/issb/deputy" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#B8212E] transition-colors uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Back to Deputy Hub
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
            Official <span className="text-[#B8212E]">Bio-Data (PIF)</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 font-medium max-w-2xl">
            This comprehensive form will be studied by the Deputy President before your interview. 
            All contradictions between your PIF, Psychologist tests, and GTO tasks will be challenged.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-0 -translate-y-1/2 rounded-full hidden sm:block"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-emerald-500 -z-0 -translate-y-1/2 rounded-full transition-all duration-300 hidden sm:block"
              style={{ width: \`\${((step - 1) / 4) * 100}%\` }}
            ></div>
            
            {steps.map(s => {
              const Icon = s.icon;
              const isActive = step === s.id;
              const isPassed = step > s.id;
              return (
                <div key={s.id} className="relative z-10 flex flex-col items-center gap-2 cursor-pointer" onClick={() => setStep(s.id)}>
                  <div className={\`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border-2 \${isActive ? 'bg-[#B8212E] text-white border-[#B8212E]' : isPassed ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-gray-400 border-gray-200'}\`}>
                    {isPassed ? <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" /> : <Icon className="w-5 h-5 sm:w-6 sm:h-6" />}
                  </div>
                  <span className={\`text-[10px] sm:text-xs font-bold uppercase tracking-wider hidden sm:block \${isActive ? 'text-[#B8212E]' : isPassed ? 'text-emerald-600' : 'text-gray-400'}\`}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden relative">
          {saved && (
            <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-pulse z-50">
              <CheckCircle2 className="w-4 h-4" /> Auto-saved
            </div>
          )}
          
          <form onSubmit={handleSaveAndNext} className="p-6 sm:p-10">
            
            {/* Step 1: Personal Profile */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-black text-slate-900 border-b border-gray-100 pb-4">1. Personal Profile</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Full Name (Block Letters)</label>
                    <input required name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none transition-all uppercase font-medium" placeholder="ALI KHAN" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">Chest No</label>
                      <input name="chestNo" value={formData.chestNo} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="e.g. 102" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">Batch No</label>
                      <input name="batchNo" value={formData.batchNo} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="e.g. P1002" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Date of Birth</label>
                    <input required type="date" name="dob" value={formData.dob} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Exact Age</label>
                    <input required name="age" value={formData.age} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="e.g. 19 Yrs 4 Mos" />
                  </div>

                  <div className="grid grid-cols-3 gap-4 md:col-span-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">Religion</label>
                      <input required name="religion" value={formData.religion} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Islam" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">Sect</label>
                      <input name="sect" value={formData.sect} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Sunni/Shia" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">Caste</label>
                      <input name="caste" value={formData.caste} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Rajput, Arain etc" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 md:col-span-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">Height</label>
                      <input required name="height" value={formData.height} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="5' 9&quot;" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">Weight</label>
                      <input required name="weight" value={formData.weight} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="70 KG" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">Blood Group</label>
                      <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none">
                        <option value="">Select</option>
                        <option value="A+">A+</option><option value="A-">A-</option>
                        <option value="B+">B+</option><option value="B-">B-</option>
                        <option value="O+">O+</option><option value="O-">O-</option>
                        <option value="AB+">AB+</option><option value="AB-">AB-</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Place of Birth</label>
                    <input required name="placeOfBirth" value={formData.placeOfBirth} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="City Name" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Domicile (District)</label>
                    <input required name="domicile" value={formData.domicile} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="District Name" />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Identification Mark</label>
                    <input name="identificationMark" value={formData.identificationMark} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="e.g. Cut mark on left eyebrow" />
                  </div>
                  
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Present Address</label>
                    <textarea required name="presentAddress" value={formData.presentAddress} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm h-20 resize-none focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Full mailing address" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Permanent Address</label>
                    <textarea required name="permanentAddress" value={formData.permanentAddress} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm h-20 resize-none focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Permanent home address" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Family Profile */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-black text-slate-900 border-b border-gray-100 pb-4">2. Family Details</h2>
                
                <div className="bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-2xl space-y-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2"><User className="w-4 h-4 text-slate-400"/> Father's Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required name="fatherName" value={formData.fatherName} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Father's Name" />
                    <select name="fatherAlive" value={formData.fatherAlive} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none">
                      <option value="Alive">Alive</option>
                      <option value="Deceased">Deceased</option>
                    </select>
                    <input required name="fatherEducation" value={formData.fatherEducation} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Education Level" />
                    <input required name="fatherOccupation" value={formData.fatherOccupation} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Exact Profession / Rank" />
                    <input required name="fatherIncome" value={formData.fatherIncome} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm md:col-span-2 focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Monthly Income (Rs)" />
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-2xl space-y-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2"><User className="w-4 h-4 text-slate-400"/> Mother's Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required name="motherName" value={formData.motherName} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Mother's Name" />
                    <select name="motherAlive" value={formData.motherAlive} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none">
                      <option value="Alive">Alive</option>
                      <option value="Deceased">Deceased</option>
                    </select>
                    <input required name="motherEducation" value={formData.motherEducation} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Education Level" />
                    <input required name="motherOccupation" value={formData.motherOccupation} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Profession (e.g. Housewife)" />
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-2xl space-y-4">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2"><Users className="w-4 h-4 text-slate-400"/> Siblings Information</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Brothers</label>
                      <input type="number" name="numberOfBrothers" value={formData.numberOfBrothers} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="0" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Sisters</label>
                      <input type="number" name="numberOfSisters" value={formData.numberOfSisters} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="0" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Your Birth Order</label>
                      <input type="number" name="birthOrder" value={formData.birthOrder} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="e.g. 2" />
                    </div>
                    <div className="col-span-3 space-y-1">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">Ages, Education & Occupation of Siblings</label>
                      <textarea required name="siblingDetails" value={formData.siblingDetails} onChange={handleInputChange} className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm h-32 resize-none focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Example:&#10;1. Brother (24) - BSEE - Engineer&#10;2. Me (19)&#10;3. Sister (16) - FSc - Student" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Academics */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-black text-slate-900 border-b border-gray-100 pb-4">3. Academic Record</h2>
                
                {/* Matric */}
                <div className="space-y-3">
                  <h3 className="font-bold text-sm text-slate-800 bg-slate-100 px-3 py-1.5 rounded-lg inline-block">Matriculation / O-Level</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <input required name="matricInstitution" value={formData.matricInstitution} onChange={handleInputChange} className="col-span-2 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="School Name & City" />
                    <input required name="matricYear" value={formData.matricYear} onChange={handleInputChange} className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Passing Year" />
                    <input required name="matricMarks" value={formData.matricMarks} onChange={handleInputChange} className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Marks / %" />
                    <input required name="matricDivision" value={formData.matricDivision} onChange={handleInputChange} className="col-span-2 md:col-span-4 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Major Subjects (e.g. Science - Bio, Chem, Phy)" />
                  </div>
                </div>

                {/* FSc */}
                <div className="space-y-3 pt-2">
                  <h3 className="font-bold text-sm text-slate-800 bg-slate-100 px-3 py-1.5 rounded-lg inline-block">Intermediate / A-Level</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <input required name="fscInstitution" value={formData.fscInstitution} onChange={handleInputChange} className="col-span-2 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="College Name & City" />
                    <input required name="fscYear" value={formData.fscYear} onChange={handleInputChange} className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Passing Year" />
                    <input required name="fscMarks" value={formData.fscMarks} onChange={handleInputChange} className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Marks / %" />
                    <input required name="fscDivision" value={formData.fscDivision} onChange={handleInputChange} className="col-span-2 md:col-span-4 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Major Subjects (e.g. Pre-Med or Pre-Eng)" />
                  </div>
                </div>

                {/* BA/BSc */}
                <div className="space-y-3 pt-2 opacity-80 hover:opacity-100 transition-opacity">
                  <h3 className="font-bold text-sm text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg inline-block">BA/BSc/BS (Optional)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <input name="bachelorsInstitution" value={formData.bachelorsInstitution} onChange={handleInputChange} className="col-span-2 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="University Name" />
                    <input name="bachelorsYear" value={formData.bachelorsYear} onChange={handleInputChange} className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Year" />
                    <input name="bachelorsMarks" value={formData.bachelorsMarks} onChange={handleInputChange} className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="CGPA / %" />
                    <input name="bachelorsDivision" value={formData.bachelorsDivision} onChange={handleInputChange} className="col-span-2 md:col-span-4 p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Major / Degree Name" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Interests */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-black text-slate-900 border-b border-gray-100 pb-4">4. Games, Sports & Hobbies</h2>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Games / Sports Played</label>
                    <textarea required name="gamesPlayed" value={formData.gamesPlayed} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm h-20 resize-none focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="e.g. Cricket, Football. Mention level (School/College/Club)." />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Positions of Responsibility</label>
                    <textarea name="sportsPositions" value={formData.sportsPositions} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm h-20 resize-none focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="e.g. Captain of College Football Team, Head Boy, Prefect." />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Hobbies & Interests</label>
                    <textarea required name="hobbies" value={formData.hobbies} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm h-20 resize-none focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="e.g. Reading History, Gardening, Coding." />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Clubs / Societies</label>
                    <textarea name="clubsSocieties" value={formData.clubsSocieties} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm h-20 resize-none focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="e.g. Member of Debating Society, Blood Donation Society." />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Misc */}
            {step === 5 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-black text-slate-900 border-b border-gray-100 pb-4">5. Miscellaneous Details</h2>
                
                <div className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Choice of Service</label>
                    <div className="flex gap-4">
                      {['Army', 'Navy', 'Air Force'].map(choice => (
                        <label key={choice} className="flex items-center gap-2 cursor-pointer p-3 border border-gray-200 rounded-xl hover:bg-gray-50 flex-1 justify-center transition-colors">
                          <input type="radio" name="choiceOfService" value={choice} checked={formData.choiceOfService === choice} onChange={handleInputChange} className="accent-[#B8212E]" />
                          <span className="text-sm font-bold">{choice}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Previous ISSB Attempts (If Any)</label>
                    <textarea name="previousIssbAttempts" value={formData.previousIssbAttempts} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm h-20 resize-none focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Provide Batch No, Chest No, and Result (Not Recommended). Leave blank if Fresh." />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">Foreign Travels</label>
                      <input name="foreignTravels" value={formData.foreignTravels} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Country and duration (or 'None')" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-500 uppercase">Police / Legal Record</label>
                      <input required name="policeRecord" value={formData.policeRecord} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="'No' or explain if yes" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Why do you want to join the Armed Forces?</label>
                    <textarea required name="motivation" value={formData.motivation} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm h-24 resize-none focus:ring-2 focus:ring-[#B8212E] outline-none" placeholder="Your honest reason (will be cross questioned extensively)." />
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 mt-4">
                  <div className="text-amber-500 mt-0.5">⚠️</div>
                  <div className="text-xs text-amber-800 leading-relaxed font-medium">
                    By submitting this PIF, you confirm that all information provided is true and accurate to the best of your knowledge. The Deputy President will construct stress scenarios based entirely on the weaknesses, family gaps, and academic trends visible in this form.
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-10 flex items-center justify-between pt-6 border-t border-gray-100">
              <button 
                type="button" 
                onClick={() => setStep(prev => Math.max(1, prev - 1))}
                className={\`px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all \${step === 1 ? 'opacity-0 pointer-events-none' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}\`}
              >
                ← Previous
              </button>
              
              <button 
                type="submit" 
                className="px-6 sm:px-8 py-3 bg-[#B8212E] hover:bg-[#961a25] active:scale-95 text-white rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg hover:shadow-[#B8212E]/30 transition-all flex items-center gap-2"
              >
                {step < 5 ? 'Save & Next →' : 'Save & Start Interview 🚀'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
