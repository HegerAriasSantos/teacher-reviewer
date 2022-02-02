import Swal from "sweetalert2";
import { ThumbUpIcon } from "@heroicons/react/outline";
import withReactContent from "sweetalert2-react-content";
import { gql } from "@apollo/client";
import client from "apollo-client";

interface Props {
    userId: string | undefined;
    teacherId: string | undefined;
}

const QUERY_VOTE = gql`
  mutation GetData ($userId: ID!, $teacherId: ID!, $clarity: Int!, $assistance: Int!, $takeclassagain: Int!) {
    voteForTeacher(
      vote: { 
        userId: $userId,
        teacherId: $teacherId,
        scoreClarity: $clarity,
        scoreAssistance: $assistance,
        scoreTakeClassAgain: $takeclassagain,
      }
    )
  }
`;

const VoteButton = ({ userId, teacherId }: Props) => {
  const MySwal = withReactContent(Swal);

  const vote = async () => {
    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          5: "5",
        });
      }, 500);
    });

    const { value: assistance } = await Swal.fire({
      title: "Did the teacher attend his classes correctly?",
      icon: "question",
      input: "radio",
      inputOptions,
      inputValidator: (value) => {
        if (!value) return "You need to choose something!";
        return null;
      },
      showCancelButton: true,
      cancelButtonText: "Skip",
    });

    const { value: takeclassagain } = await Swal.fire({
      title: "Would you take class again with this teacher?",
      icon: "question",
      input: "radio",
      inputOptions,
      inputValidator: (value) => {
        if (!value) return "You need to choose something!";
        return null;
      },
      showCancelButton: true,
      cancelButtonText: "Skip",
    });

    const { value: clarity } = await Swal.fire({
      title: "Rate the clarity in exposing the topics.",
      icon: "question",
      input: "radio",
      inputOptions,
      inputValidator: (value) => {
        if (!value) return "You need to choose something!";
        return null;
      },
      showCancelButton: true,
      cancelButtonText: "Skip",
    });

    if (assistance || clarity || takeclassagain) {
      try {
        await client.mutate({
          mutation: QUERY_VOTE,
          variables: {
            userId,
            teacherId,
            assistance: Number(assistance) || 0,
            clarity: Number(clarity) || 0,
            takeclassagain: Number(takeclassagain) || 0,
          },
        });

        MySwal.fire({
          title: "Votado",
          icon: "success",
          text: "Tu voto se guardo en nuestros registros. (Muchas veces tarda en reflejarse el voto)",
        });
      } catch (err) {
        console.error("🚀 ~ file: index.tsx ~ line 64 ~ err", err);
        MySwal.fire({
          title: "Uups...",
          icon: "error",
          text: "Contacta a un administrador, este error es super raro.",
        });
      }
    }
  };

  return (
    <button type="button" onClick={vote} className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition-all duration-200 hover:border-2 border-default-color rounded shadow-md md:w-auto bg-default-color focus:shadow-outline focus:outline-none">
      <div className="flex items-center">
        <div className="mr-2 font-semibold text-white">
          Leave my vote
        </div>
        <ThumbUpIcon className="w-6 h-6" />
      </div>
    </button>
  );
};

export default VoteButton;
