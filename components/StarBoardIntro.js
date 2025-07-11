import DecryptedText from "@/components/DecryptedText";

export default function StarBoardIntro() {
  return (
    <div className="w-11/12 max-w-md mx-auto text-sm md:text-base text-gray-300 px-6 text-start leading-relaxed">
      <DecryptedText
        text="This is a starry message board for Hayato Sumino’s 30th birthday,"
        animateOn="view"
        revealDirection="start"
        sequential={true}       // 啟用逐字 reveal
        speed={60}
        maxIterations={15}
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*"
        className="text-gray-300"
        encryptedClassName="text-gray-500"
      />
      <DecryptedText
        text="where each message turns into a musical star, shining in this universe."
        animateOn="view"
        revealDirection="start"
        sequential={true}       // 啟用逐字 reveal
        speed={60}
        maxIterations={15}
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*"
        className="text-gray-300"
        encryptedClassName="text-gray-500"
      />
      <DecryptedText
        text='The chords are inspired by his original piece, "Human Universe",'
        animateOn="view"
        revealDirection="start"
        sequential={true}       // 啟用逐字 reveal
        speed={60}
        maxIterations={15}
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*"
        className="text-gray-300"
        encryptedClassName="text-gray-500"
      />
      <DecryptedText
        text="with a few special selections hidden among them."
        animateOn="view"
        revealDirection="start"
        sequential={true}       // 啟用逐字 reveal
        speed={60}
        maxIterations={15}
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*"
        className="text-gray-300"
        encryptedClassName="text-gray-500"
      />
      <DecryptedText
        text="Tap the stars to hear their melodies,"
        animateOn="view"
        revealDirection="start"
        sequential={true}       // 啟用逐字 reveal
        speed={60}
        maxIterations={15}
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*"
        className="text-gray-300"
        encryptedClassName="text-gray-500"
      />
      <DecryptedText
        text="and try to find the hidden 9th chord."
        animateOn="view"
        revealDirection="start"
        sequential={true}       // 啟用逐字 reveal
        speed={60}
        maxIterations={15}
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*"
        className="text-gray-300"
        encryptedClassName="text-gray-500 font-mono"
      />
    </div>
  );
}
