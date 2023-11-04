const priorityToString = (priority) => {
    switch (priority) {
      case 0:
        return "No priority";
      case 4:
        return "Urgent";
      case 3:
        return "High";
      case 2:
        return "Medium";
      case 1:
        return "Low";
      default:
        return "";
    }
  };
  export default priorityToString;
  