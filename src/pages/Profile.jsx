import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import LanguageModal from '../components/LanguageModal';
import { translations } from '../translations';

const Profile = () => {
  const { user, updateUser } = useUser();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  
  const t = translations[language].profile;
  
  // Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      navigate('/login');
      return;
    }

    if (!user.isLoggedIn) {
      setIsLoading(false);
      navigate('/login');
      return;
    }

    // Initialize editedUser when user data is available
    if (user) {
      setEditedUser({ ...user });
      setIsLoading(false);
    }
  }, [user, navigate]);

  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  // If there's an error, show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-xl text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // If user is not logged in, don't render anything while redirecting
  if (!user || !user.isLoggedIn) {
    return null;
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    try {
      // If KYC is being submitted
      if (editedUser.kyc?.idType && editedUser.kyc?.idNumber && editedUser.kyc?.idDocument) {
        editedUser.kyc.status = 'pending';
        editedUser.kyc.submissionDate = new Date().toISOString();
      }
      
      await updateUser(editedUser);
      setIsEditing(false);
    } catch (err) {
      setError('Failed to save changes. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <div className="pt-16 text-white">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Image and Basic Info */}
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl transform transition-transform duration-300 group-hover:scale-105">
                {user.profileImage ? (
                  <img 
                    src={user.profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-600">
                      <svg className="h-20 w-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                )}
              </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <button className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-colors">
                    {t.changePhoto}
                  </button>
                </div>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                  className="mt-6 text-2xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none focus:border-blue-400 text-center"
                />
              ) : (
                <h2 className="mt-6 text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{user.name}</h2>
              )}
              <p className="text-gray-400 text-sm mt-1">{t.memberSince} {user.memberSince}</p>
              
              <div className="flex gap-4 mt-6">
                {isEditing ? (
                  <>
                    <button 
                      onClick={handleSaveChanges}
                      className="px-6 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25 transform hover:-translate-y-0.5"
                    >
                      {t.saveChanges}
                    </button>
                    <button 
                      onClick={handleCancelEdit}
                      className="px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/25 transform hover:-translate-y-0.5"
                    >
                      {t.cancel}
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={handleEditClick}
                      className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5"
                    >
                      {t.editProfile}
                    </button>
                    <button 
                      onClick={() => navigate('/orders')}
                      className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-0.5"
                    >
                      Your Orders
                    </button>
                    <button className="px-6 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25 transform hover:-translate-y-0.5">
                      {t.listNewItem}
                    </button>
                  </>
                )}
            </div>
          </div>
          
            {/* Main Content */}
            <div className="flex-1 space-y-8">
          {/* Role Selection */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold mb-4">{t.role}</h3>
            <div className="flex gap-4">
                  <div 
                    className={`px-6 py-3 rounded-full transition-all duration-300 cursor-pointer ${
                      editedUser.role.renter 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25' 
                        : 'bg-gray-700/50 hover:bg-gray-700'
                    }`}
                    onClick={() => isEditing && setEditedUser(prev => ({
                      ...prev,
                      role: { ...prev.role, renter: !prev.role.renter }
                    }))}
                  >
                    {t.renter}
              </div>
                  <div 
                    className={`px-6 py-3 rounded-full transition-all duration-300 cursor-pointer ${
                      editedUser.role.owner 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25' 
                        : 'bg-gray-700/50 hover:bg-gray-700'
                    }`}
                    onClick={() => isEditing && setEditedUser(prev => ({
                      ...prev,
                      role: { ...prev.role, owner: !prev.role.owner }
                    }))}
                  >
                    {t.owner}
              </div>
            </div>
          </div>
          
          {/* Bio */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold mb-4">{t.bio}</h3>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={editedUser.bio}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/30 border border-gray-600 rounded-lg p-4 text-gray-300 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                    rows="4"
                    placeholder={t.bioPlaceholder}
                  />
                ) : (
            <p className="text-gray-300 leading-relaxed">
                    {user.bio || t.bioPlaceholder}
            </p>
                )}
          </div>
          
          {/* Ratings and Reviews */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold mb-4">{t.ratings}</h3>
                <div className="flex items-center gap-8">
                  <div className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                    {user.ratings.average}
                  </div>
              <div className="flex-1">
                {user.ratings.distribution.map((rating, index) => (
                      <div key={index} className="flex items-center gap-3 mb-2">
                        <span className="text-sm w-4">{rating.stars}</span>
                        <div className="flex-1 bg-gray-700/50 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${rating.percentage}%` }}
                      ></div>
                    </div>
                        <span className="text-sm text-gray-400 w-12 text-right">{rating.percentage}%</span>
                      </div>
                    ))}
                    <p className="text-sm text-gray-400 mt-2">{user.ratings.count} reviews</p>
              </div>
            </div>
          </div>
          
          {/* Trust Score */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{t.trustScore}</h3>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                    {user.trustScore}%
                  </span>
            </div>
                <div className="w-full bg-gray-700/50 h-3 rounded-full overflow-hidden">
              <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500" 
                style={{ width: `${user.trustScore}%` }}
              ></div>
            </div>
          </div>
          
          {/* KYC Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-semibold">{t.kyc}</h3>
                <p className="text-gray-400">{t.kycDesc}</p>
              </div>
              <div>
                <button 
                  onClick={handleEditClick}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5"
                >
                  {isEditing ? t.saveChanges : t.kycSubmit}
                </button>
              </div>
            </div>
            
            {isEditing && (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">{t.idType}</label>
                  <select
                    name="kycIdType"
                    value={editedUser.kyc?.idType || ''}
                    onChange={(e) => setEditedUser(prev => ({
                      ...prev,
                      kyc: { ...prev.kyc, idType: e.target.value }
                    }))}
                    className="w-full bg-gray-700/30 border border-gray-600 rounded-lg p-4 text-gray-300 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                  >
                    <option value="">Select ID Type</option>
                    <option value="governmentId">{t.governmentId}</option>
                    <option value="passport">{t.passport}</option>
                    <option value="drivingLicense">{t.drivingLicense}</option>
                    <option value="panCard">PAN Card</option>
                    <option value="aadharCard">Aadhar Card</option>
                    <option value="voterId">Voter ID</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">{t.idNumber}</label>
                  <input
                    type="text"
                    name="kycIdNumber"
                    value={editedUser.kyc?.idNumber || ''}
                    onChange={(e) => setEditedUser(prev => ({
                      ...prev,
                      kyc: { ...prev.kyc, idNumber: e.target.value }
                    }))}
                    placeholder={t.idNumberPlaceholder}
                    className="w-full bg-gray-700/30 border border-gray-600 rounded-lg p-4 text-gray-300 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Upload ID Document (PDF)</label>
                  <div className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg p-6">
                    <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setEditedUser(prev => ({
                            ...prev,
                            kyc: { ...prev.kyc, idDocument: file }
                          }));
                        }
                      }}
                      className="hidden"
                      id="idDocument"
                    />
                    <label
                      htmlFor="idDocument"
                      className="bg-gray-600 hover:bg-gray-500 text-white rounded-full px-4 py-2 transition-colors duration-300 cursor-pointer"
                    >
                      Upload PDF
                    </label>
                  </div>
                </div>

                <p className="text-sm text-gray-400 text-center">{t.kycNote}</p>
              </div>
            )}

            {!isEditing && user.kyc?.status === 'pending' && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-300">{t.kycPending}</p>
              </div>
            )}

            {!isEditing && user.kyc?.status === 'verified' && (
              <div className="text-center py-4">
                <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <p className="text-gray-300">{t.kycVerified}</p>
              </div>
            )}

            {!isEditing && user.kyc?.status === 'rejected' && (
              <div className="text-center py-4">
                <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <p className="text-gray-300">{t.kycRejected}</p>
              </div>
            )}
          </div>
          
          {/* Public Profile */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center">
              <div>
                    <h3 className="text-xl font-semibold mb-2">{t.publicProfile}</h3>
                    <p className="text-gray-400">{t.publicProfileDesc}</p>
              </div>
                  <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5">
                    {t.viewProfile}
              </button>
            </div>
          </div>
          
          {/* User Data */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold mb-6">{t.userData}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-gray-700/30 p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-300">
                    <h4 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">{user.data.listings}</h4>
                    <p className="text-gray-400 mt-2">{t.listings}</p>
              </div>
                  <div className="bg-gray-700/30 p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-300">
                    <h4 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">{user.data.transactions}</h4>
                    <p className="text-gray-400 mt-2">{t.transactions}</p>
              </div>
                  <div className="bg-gray-700/30 p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-300">
                    <h4 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">{user.data.bookings}</h4>
                    <p className="text-gray-400 mt-2">{t.bookings}</p>
              </div>
                  <div className="bg-gray-700/30 p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-300">
                    <h4 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">{user.data.favorites}</h4>
                    <p className="text-gray-400 mt-2">{t.favorites}</p>
              </div>
            </div>
          </div>
          
          {/* Settings */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-semibold mb-6">{t.settings}</h3>
                <div className="space-y-4">
                  <div 
                    className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors duration-300 cursor-pointer"
                    onClick={() => setIsLanguageModalOpen(true)}
                  >
                    <div className="bg-gray-600/50 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                  </svg>
                </div>
                <div>
                      <h4 className="font-medium">{t.languageRegion}</h4>
                      <p className="text-sm text-gray-400">{t.languageRegionDesc}</p>
                </div>
              </div>
              
                  <div className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors duration-300 cursor-pointer">
                    <div className="bg-gray-600/50 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                </div>
                <div>
                      <h4 className="font-medium">{t.communication}</h4>
                      <p className="text-sm text-gray-400">{t.communicationDesc}</p>
                </div>
              </div>
              
                  <div className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors duration-300 cursor-pointer">
                    <div className="bg-gray-600/50 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <div>
                      <h4 className="font-medium">{t.payment}</h4>
                      <p className="text-sm text-gray-400">{t.paymentDesc}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Turn off public profile button */}
              <div className="flex justify-center">
                <button className="px-8 py-3 rounded-xl bg-gray-700/50 hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-gray-500/25 transform hover:-translate-y-0.5">
                  {t.turnOffPublic}
            </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Language Modal */}
      <LanguageModal 
        isOpen={isLanguageModalOpen} 
        onClose={() => setIsLanguageModalOpen(false)} 
      />
    </div>
  );
};

export default Profile; 