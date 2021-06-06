const notes = require('./notes.js');
const { nanoid } = require('nanoid');

const addNoteHandler = (req, h) =>  {
    const { title, tags, body } = req.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNotes = {
        id,
        title,
        tags,
        body,
        createdAt,
        updatedAt
    };

    notes.push(newNotes);
    
    const isSuccess = notes.filter(note => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id
            }
        });
        response.code(201);
        
        return response;
    }

    return h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan'
    })
    .code(500);
}

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
      notes,
    },
});

const getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
   
    const note = notes.filter((n) => n.id === id)[0];
   
   if (note !== undefined) {
      return {
        status: 'success',
        data: {
          note,
        },
      };
    }
    const response = h.response({
      status: 'fail',
      message: 'Catatan tidak ditemukan',
    });
    response.code(404);
    return response;
};

const editNoteByIdHandler = (req, h) => {
	const { id } = req.params;
	const { title, tags, body } = req.payload;

	const updatedAt = new Date().toISOString();

	const index = notes.findIndex(note => note.id === id);

	if (index !== -1) {
		notes[index] = {
			...notes[index],
			title,
			tags,
			body,
			updatedAt
		}

		const response = h.response({
			status: 'success',
			message: 'Catatan berhasil diperbarui'
		});
		response.code(200); 
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Gagal memperbarui catatan. Id tidak ditemukan',
	});
	response.code(404);
	return response;
}

const deleteNoteByIdHandler = (req, h) => {
	const { id } = req.params;

	const index = notes.findIndex(note => note.id === id);

	if (index !== -1) {
		notes.splice(index, 1);
		const response = h.response({
			status: 'success',
			message: 'Berhasil menghapus catatan'
		})
		response.code(200);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Catatan gagal dihapus. Id tidak ditemukan',
	});
	response.code(404);
	return response;
}

module.exports = { 
	addNoteHandler, 
	getAllNotesHandler, 
	getNoteByIdHandler, 
	editNoteByIdHandler,
	deleteNoteByIdHandler
};