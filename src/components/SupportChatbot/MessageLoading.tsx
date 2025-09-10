export const MessageLoading = () => {
  return (
    <div className="flex justify-start">
      <div className="chatbot-msg agent-msg">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="size-1 bg-primary rounded-full animate-bounce" />
            <div
              className="size-1 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            />
            <div
              className="size-1 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
