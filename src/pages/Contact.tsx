import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const { firstName, lastName, email, message } = formData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevValue) => ({
      ...prevValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    const encodedMessage = encodeURIComponent(message);
    const mailto = `mailto:sparshkadian323@gmail.com?body=${encodedMessage}`;
    window.open(mailto, '_blank');
  };

  return (
    <div>
      <div className='max-w-4xl mx-auto px-5 mt-[140px]'>
        <p className='text-center manrope-semibold text-2xl sm:text-4xl'>
          Drop Me a Line, Let Me Know What You Think
        </p>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-7 sm:gap-10 mt-10 sm:mt-20'
        >
          <div className='flex flex-col gap-7 sm:gap-0 sm:flex-row items-center justify-between'>
            <div className='relative flex flex-col gap-5 sm:w-[45%] w-full'>
              <label
                htmlFor='firstName'
                className='text-sm text-[#777] manrope-normal'
              >
                First Name
              </label>
              <input
                value={firstName}
                onChange={handleInputChange}
                type='text'
                id='firstName'
                className='border-b-2 border-b-black focus:outline-none text-lg manrope-normal'
              />
            </div>

            <div className='flex flex-col gap-4 sm:w-[45%] w-full'>
              <label
                htmlFor='lastName'
                className='text-sm text-[#777] manrope-normal'
              >
                Last Name
              </label>
              <input
                value={lastName}
                onChange={handleInputChange}
                type='text'
                id='lastName'
                className='border-b-2 border-b-black focus:outline-none text-lg manrope-normal'
              />
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <label
              htmlFor='Email'
              className='text-sm text-[#777] manrope-normal'
            >
              Email*
            </label>
            <input
              value={email}
              onChange={handleInputChange}
              type='email'
              id='email'
              className='border-b-2 border-b-black focus:outline-none text-lg manrope-normal w-full'
            />
          </div>

          <div className='flex flex-col gap-10'>
            <label
              htmlFor='Message'
              className='text-sm text-[#777] manrope-normal'
            >
              Message...
            </label>
            <input
              value={message}
              onChange={handleInputChange}
              type='text'
              id='message'
              className='border-b-2 border-b-black focus:outline-none text-lg manrope-normal w-full'
            />
          </div>

          <button className='nav__button w-[150px] self-center'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
