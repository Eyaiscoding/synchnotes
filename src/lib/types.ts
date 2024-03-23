import { z } from "zod";
export const FormSchema = z.object({
 email:z.string().describe('Email').email({ message:"invalid email"}),
 password:z.string().describe("Password").min(1,'Password is required'),
});

export const CreateWorkspaceFormSchema =z.object({
   workspaceName:z.string().describe('Workspace Name').min(1, 'workspace name must be of 1 character'),
   logo:z.any(),


});