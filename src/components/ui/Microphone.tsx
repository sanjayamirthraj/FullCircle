"use client";

// Import necessary modules and components
import { useEffect, useState, useRef } from "react";
import { TiMicrophone } from "react-icons/ti";
import { IoIosPause } from "react-icons/io";


// Declare a global interface to add the webkitSpeechRecognition property to the Window object
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

// Export the MicrophoneComponent function component
export default function MicrophoneComponent() {
  // State variables to manage recording status, completion, and transcript
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [transcript, setTranscript] = useState("");

  // Reference to store the SpeechRecognition instance
  const recognitionRef = useRef<any>(null);

  // Function to start recording
  const startRecording = () => {
    setIsRecording(true);
    // Create a new SpeechRecognition instance and configure it
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    // Event handler for speech recognition results
    recognitionRef.current.onresult = (event: any) => {
      const { transcript } = event.results[event.results.length - 1][0];

      // Log the recognition results and update the transcript state
      console.log(event.results);
      setTranscript(transcript);
    };

    // Start the speech recognition
    recognitionRef.current.start();
  };

  // Cleanup effect when the component unmounts
  useEffect(() => {
    return () => {
      // Stop the speech recognition if it's active
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Function to stop recording
  const stopRecording = () => {
    if (recognitionRef.current) {
      // Stop the speech recognition and mark recording as complete
      recognitionRef.current.stop();
      setRecordingComplete(true);
    }
  };

  // Toggle recording state and manage recording actions
  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  // Render the microphone component with appropriate UI based on recording state
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="w-full">
        {(isRecording || transcript) && (
          <div className="w-1/4 m-auto rounded-md border p-4 bg-white">
            <div className="flex-1 flex w-full justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {recordingComplete ? "Recorded" : "Recording"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {recordingComplete
                    ? "Thanks for talking."
                    : "Start speaking..."}
                </p>
              </div>
              {isRecording && (
                <div className="rounded-full w-4 h-4 bg-red-400 animate-pulse" />
              )}
            </div>

            {transcript && (
              <div className="border rounded-md p-2 h-fullm mt-4">
                <p className="mb-0">{transcript}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center w-full">
          {isRecording ? (
            // Button for stopping recording
            <button
              onClick={handleToggleRecording}
              className="mt-10 m-auto flex items-center justify-center bg-red-400 hover:bg-red-500 rounded-full w-20 h-20 focus:outline-none"
            >
              <IoIosPause />
            </button>
          ) : (
            // Button for starting recording
            <button
              onClick={handleToggleRecording}
              className="mt-10 m-auto flex items-center justify-center bg-blue-400 hover:bg-blue-500 rounded-full w-20 h-20 focus:outline-none"
            >
             <TiMicrophone />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}