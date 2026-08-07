export const MessageLoading = () => {
  return (
    <div className="flex justify-start">
      <div className="chatbot-msg agent-msg">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="bg-primary size-1 animate-bounce rounded-full" />
            <div
              className="bg-primary size-1 animate-bounce rounded-full"
              style={{ animationDelay: "0.1s" }}
            />
            <div
              className="bg-primary size-1 animate-bounce rounded-full"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
