import  { useState } from 'react';

const AddJob = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [languagePair, setLanguagePair] = useState('');
  const [deadline, setDeadline] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log({
      jobTitle,
      description,
      languagePair,
      deadline,
      budget,
    });

    // Clear the form after submission
    setJobTitle('');
    setDescription('');
    setLanguagePair('');
    setDeadline('');
    setBudget('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Post a New Job</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="input input-bordered w-full mt-1"
              placeholder="Enter the job title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full mt-1"
              placeholder="Enter job description"
              rows="4"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Language Pair</label>
            <input
              type="text"
              value={languagePair}
              onChange={(e) => setLanguagePair(e.target.value)}
              className="input input-bordered w-full mt-1"
              placeholder="e.g., English to Spanish"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="input input-bordered w-full mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Budget ($)</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="input input-bordered w-full mt-1"
              placeholder="Enter your budget"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary w-full mt-4 py-3 px-5"
            >
              Submit Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
