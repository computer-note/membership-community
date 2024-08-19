interface Props {
  termContent: string;
  agreeButtonLabel: string;
  htmlName: string;
}

function TermItem({
  agreeButtonLabel,
  termContent,
  htmlName,
}: Props) {
  return (
    <div className='flex flex-col gap-[6px]'>
      <div>{termContent}</div>
      <div className='flex gap-[6px]'>
        <input type='checkbox' id={htmlName} name={htmlName} />
        <label htmlFor={htmlName}>{agreeButtonLabel}</label>
      </div>
    </div>
  );
}

export default TermItem;
