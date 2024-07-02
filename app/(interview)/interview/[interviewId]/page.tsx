import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { syncInterview } from '~/actions/interviews';
import FeedbackBanner from '~/components/Feedback/FeedbackBanner';
import { getLimitInterviewsStatus } from '~/queries/appSettings';
import { getInterviewById } from '~/queries/interviews';
import { getServerSession } from '~/utils/auth';
import InterviewShell from '../_components/InterviewShell';

export default async function Page({
  params,
}: {
  params: { interviewId: string };
}) {
  const { interviewId } = params;

  if (!interviewId) {
    return 'No interview id found';
  }

  const interview = await getInterviewById(interviewId);
  const { session } = await getServerSession();

  // If the interview is not found, redirect to the 404 page
  if (!interview) {
    notFound();
  }

  // if limitInterviews is enabled
  // Check cookies for interview already completed for this user for this protocol
  // and redirect to finished page
  const limitInterviews = await getLimitInterviewsStatus();

  if (limitInterviews && cookies().get(interview?.protocol?.id ?? '')) {
    redirect('/interview/finished');
  }

  // If the interview is finished, redirect to the finish page
  if (interview?.finishTime) {
    redirect('/interview/finished');
  }

  return (
    <>
      {session && <FeedbackBanner />}
      <InterviewShell interview={interview} syncInterview={syncInterview} />
    </>
  );
}
