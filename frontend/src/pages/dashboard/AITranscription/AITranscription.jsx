import React, { useState } from "react";
import { AiOutlineCloudUpload, AiOutlineSound } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

const AudioTranscription = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [transcription, setTranscription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("audio")) {
      setAudioFile(file);
      setAudioUrl(URL.createObjectURL(file)); // Create a URL for the audio file
      toast.success("Audio file uploaded successfully!");
    } else {
      toast.error("Please upload a valid audio file!");
    }
  };

  const handleTranscription = async () => {
    if (!audioFile) {
      toast.error("No audio file uploaded!");
      return;
    }

    setIsLoading(true);

    // Simulate AI transcription process
    setTimeout(() => {
      setTranscription(
        "This is the AI transcription of the uploaded audio. This feature can be integrated with an API for real transcriptions."
      );
      setIsLoading(false);
      toast.success("Transcription completed!");
    }, 3000);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-lg">
      <Toaster />
      <h1 className="text-3xl font-bold mb-4 text-center flex items-center justify-center">
        <AiOutlineSound className="mr-2" /> AI Audio Transcription
      </h1>

      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Upload Audio File</label>
        <div className="flex items-center">
          <label className="flex flex-col items-center px-4 py-6 bg-gray-100 text-blue-500 rounded-lg cursor-pointer border border-dashed border-blue-500">
            <AiOutlineCloudUpload className="text-4xl mb-2" />
            <span className="text-sm">Click to upload an audio file</span>
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>

      {/* Audio Player */}
      {audioUrl && (
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Audio Player</h2>
          <audio controls className="w-full">
            <source src={audioUrl} type={audioFile?.type} />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      <button
        onClick={handleTranscription}
        className={`w-full btn bg-blue-500 text-white rounded-lg py-2 font-bold hover:bg-blue-600 ${
          isLoading ? "loading loading-spinner" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Transcribing..." : "Transcribe Audio"}
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Transcription:</h2>
        <div className="p-4 bg-gray-100 rounded-lg min-h-[100px]">
          {transcription ? (
            <p>{transcription}</p>
          ) : (
            <p className="text-gray-400">The transcription will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioTranscription;
