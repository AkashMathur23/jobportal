import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
    },
    position: {
      type: String,
      required: [true, "Job Position is required"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["pending", "reject", "interview"],
      default: "pending",
    },
    workType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract"],
      default: "full-time",
    },
    workLocation: {
      type: String,
      required: [true, "Work location is required"],
      default: "Delhi",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User", //it should be same as userModel export
    },
  },
  { timestamps: true }
);

export default mongoose.model("jobs", jobSchema);
